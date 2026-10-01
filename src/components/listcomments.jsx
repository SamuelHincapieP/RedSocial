import CommentItem from './commentitem'

/**
 * ListComments  (nombre y prop igual que en el video: <ListComments listComData={listCom} />)
 * Usa el ID de cada comentario como key de React: por eso los IDs
 * NUNCA se repiten (ver src/utils/id.js) y no aparece el error
 * "Encountered two children with the same key".
 */
export default function ListComments({ listComData, now, onReply, onLike }) {
  if (listComData.length === 0) return null

  return (
    <ul className="comment-list">
      {listComData.map((comment) => (
        <CommentItem
          key={comment.id} // 👈 ID único => React nunca marca "duplicate key"
          comment={comment}
          commentId={comment.id}
          depth={0}
          now={now}
          onReply={onReply}
          onLike={onLike}
        />
      ))}
    </ul>
  )
}
