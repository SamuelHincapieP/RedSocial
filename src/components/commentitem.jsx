import { useState } from 'react'
import Avatar from './Avatar'
import CommentForm from './commentform'
import { IconHeart } from './Icons'
import { formatRelativeTime } from '../utils/time'

/**
 * Un comentario (y, si tiene, sus respuestas anidadas como en Facebook).
 *
 *  • useState  -> controla si está abierta la caja de "Responder"
 *  • El ID siempre llega desde el padre (nunca se genera aquí),
 *    así evitamos el error del ID duplicado.
 */
export default function CommentItem({
  comment,
  commentId,
  replyId = null,
  depth = 0,
  now,
  onReply,
  onLike,
}) {
  const [replying, setReplying] = useState(false)

  const likeCount = comment.likes.base + (comment.likes.mine ? 1 : 0)
  const replies = comment.replies ?? []
  const isReply = replyId !== null

  const handleReply = (text) => {
    onReply(commentId, text) // siempre se responde al comentario raíz (1 nivel, como FB)
    setReplying(false)
  }

  return (
    <li className={`comment ${isReply ? 'comment--reply' : ''}`}>
      <Avatar user={comment.author} size={isReply ? 28 : 32} />

      <div className="comment__body">
        <div className="comment__bubble">
          <span className="comment__name">{comment.author.name}</span>
          <p className="comment__text">{comment.text}</p>
        </div>

        {likeCount > 0 && (
          <div className="comment__likes">
            <span className="comment__likes-badge">
              <IconHeart />
            </span>
            <span>{likeCount}</span>
          </div>
        )}

        <div className="comment__actions">
          <button
            type="button"
            className={`comment__action ${comment.likes.mine ? 'is-active' : ''}`}
            onClick={() => onLike(commentId, replyId)}
          >
            {comment.likes.mine ? 'No me gusta' : 'Me gusta'}
          </button>
          <span className="comment__dot">·</span>
          <button
            type="button"
            className="comment__action"
            onClick={() => setReplying((open) => !open)}
          >
            Responder
          </button>
          <span className="comment__dot">·</span>
          <time className="comment__time">{formatRelativeTime(comment.createdAt, now)}</time>
        </div>

        {replying && (
          <CommentForm
            autoFocus
            compact
            placeholder={`Respondiendo a ${comment.author.name}...`}
            getCommentData={handleReply}
          />
        )}

        {replies.length > 0 && (
          <ul className="comment__replies">
            {replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                commentId={commentId}
                replyId={reply.id}
                depth={depth + 1}
                now={now}
                onReply={onReply}
                onLike={onLike}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}
