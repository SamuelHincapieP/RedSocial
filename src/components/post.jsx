import { useEffect, useRef, useState } from 'react'
import { usePost } from '../context/PostContext'
import Avatar from './Avatar'
import CommentForm from './commentform'
import ListComments from './listcomments'
import ReactionPicker, { REACTIONS } from './ReactionPicker'
import ShareModal from './ShareModal'
import Skeleton from './Skeleton'
import {
  IconClose,
  IconComment,
  IconGlobe,
  IconMore,
  IconShare,
  IconThumbOutline,
} from './Icons'
import { commentsLabel, formatRelativeTime, sharesLabel } from '../utils/time'

/**
 * ============================================================
 *  POST DE FACEBOOK  (la tarea completa: nivel 5.0)
 *  Componente principal, igual que en el video: <Post />
 * ============================================================
 *  Hooks usados aquí:
 *   • useState   -> texto, menú, reacciones, modal, toast, "ver más"
 *   • useEffect  -> cerrar menú con clic fuera / ocultar el toast
 *   • useContext -> todo el estado viene de usePost() (PostContext)
 * ============================================================
 */
export default function Post() {
  const {
    post,
    loading,
    now,
    totalComments,
    totalLikes,
    setReaction,
    addComment,
    addReply,
    toggleCommentLike,
    sharePost,
    resetPost,
  } = usePost()

  const [expanded, setExpanded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showId, setShowId] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const pickerTimer = useRef(null)
  const inputRef = useRef(null)

  /* useEffect -> cerrar el menú ⋯ si se hace clic fuera de él */
  useEffect(() => {
    if (!menuOpen) return
    const onOutsideClick = (e) => {
      if (!e.target.closest('.post__menu')) setMenuOpen(false)
    }
    document.addEventListener('click', onOutsideClick)
    return () => document.removeEventListener('click', onOutsideClick)
  }, [menuOpen])

  /* useEffect -> el toast se oculta solo a los 2.6 s */
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  /* useEffect -> limpiar el timer del menú de reacciones al desmontar */
  useEffect(() => () => clearTimeout(pickerTimer.current), [])

  if (loading) return <Skeleton />

  /* ------------------------- reacciones ------------------------- */
  const openPicker = () => {
    clearTimeout(pickerTimer.current)
    pickerTimer.current = setTimeout(() => setPickerOpen(true), 350)
  }
  const closePicker = () => {
    clearTimeout(pickerTimer.current)
    setPickerOpen(false)
  }

  const handleLikeClick = () => {
    if (post.likes.myReaction) {
      setReaction(null)
      setToast('Quitaste tu reacción')
    } else {
      setReaction('👍')
      setToast('Me gusta 👍')
    }
    closePicker()
  }

  const handlePick = (emoji) => {
    setReaction(emoji)
    closePicker()
    const found = REACTIONS.find((r) => r.emoji === emoji)
    setToast(`${found ? found.label : 'Reaccionaste'} ${emoji}`)
  }

  /* ------------------------- comentarios ------------------------ */
  const focusComposer = () => {
    inputRef.current?.focus()
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleComment = (text) => {
    addComment(text)
    setToast('Comentario publicado 💬')
  }

  /* -------------------------- compartir ------------------------- */
  const confirmShare = () => {
    sharePost()
    setShareOpen(false)
    setToast('Compartiste esta publicación 🚀')
  }

  /* --------------------------- menú ⋯ --------------------------- */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href.split('#')[0]}#${post.id}`)
      setToast('Enlace copiado 🔗')
    } catch {
      setToast(`ID: ${post.id}`)
    }
    setMenuOpen(false)
  }

  const reset = () => {
    resetPost()
    setMenuOpen(false)
    setExpanded(false)
    setShowId(false)
    setToast('Datos de ejemplo restablecidos ♻️')
  }

  /* ---------------------------- vistas -------------------------- */
  const reacted = Boolean(post.likes.myReaction)
  const reactionBadges = reacted ? [post.likes.myReaction] : totalLikes > 0 ? ['👍'] : []
  const hasStats = totalLikes > 0 || totalComments > 0 || post.shares > 0

  return (
    <>
      <article className="post" data-post-id={post.id}>
        {/* ------------------------- CABECERA ------------------------- */}
        <header className="post__header">
          <Avatar user={post.author} size={40} />
          <div className="post__header-info">
            <span className="post__author">{post.author.name}</span>
            <div className="post__meta">
              <time title={new Date(post.createdAt).toLocaleString('es-ES')}>
                {formatRelativeTime(post.createdAt, now)}
              </time>
              <span>·</span>
              <IconGlobe />
            </div>
          </div>

          <div className="post__menu">
            <button
              type="button"
              className="post__header-btn"
              aria-label="Más opciones"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <IconMore />
            </button>

            {menuOpen && (
              <div className="post__dropdown">
                <button
                  type="button"
                  className="post__dropdown-item"
                  onClick={() => {
                    setShowId((v) => !v)
                    setMenuOpen(false)
                  }}
                >
                  🔍 {showId ? 'Ocultar' : 'Ver'} ID de la publicación
                </button>
                <button type="button" className="post__dropdown-item" onClick={copyLink}>
                  🔗 Copiar enlace
                </button>
                <button type="button" className="post__dropdown-item" onClick={reset}>
                  ♻️ Restablecer datos de ejemplo
                </button>
              </div>
            )}
          </div>

          <button type="button" className="post__header-btn" aria-label="Cerrar publicación">
            <IconClose />
          </button>
        </header>

        {/* ID ÚNICO (corregido) visible solo si lo pides en el menú ⋯ */}
        {showId && (
          <div className="post__id">
            <span>ID de la publicación:</span> <code>{post.id}</code>
          </div>
        )}

        {/* -------------------------- TEXTO --------------------------- */}
        <div className="post__content">
          <p className={`post__text ${expanded ? '' : 'post__text--clamped'}`}>{post.text}</p>
          <button type="button" className="post__more" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
        </div>

        {post.image && (
          <figure className="post__figure">
            <img className="post__image" src={post.image} alt="Publicación de Samuel" />
          </figure>
        )}

        {/* --------------------- CONTADORES -------------------------- */}
        {hasStats && (
          <div className="post__stats">
            <div className="post__reactions">
              {reactionBadges.map((emoji, i) => (
                <span className="post__reaction" key={`${emoji}-${i}`} style={{ zIndex: 3 - i }}>
                  {emoji}
                </span>
              ))}
              {totalLikes > 0 && <span className="post__likes-count">{totalLikes}</span>}
            </div>

            <div className="post__counts">
              {totalComments > 0 && (
                <button type="button" className="post__count-link" onClick={focusComposer}>
                  {commentsLabel(totalComments)}
                </button>
              )}
              {post.shares > 0 && <span>{sharesLabel(post.shares)}</span>}
            </div>
          </div>
        )}

        {/* ---------------------- BOTONES DE ACCIÓN ------------------- */}
        <div className="post__actions">
          <div className="post__like-wrap" onMouseEnter={openPicker} onMouseLeave={closePicker}>
            <ReactionPicker visible={pickerOpen} onPick={handlePick} />
            <button
              type="button"
              className={`post__action ${reacted ? 'is-active' : ''}`}
              onClick={handleLikeClick}
            >
              {reacted ? (
                <span className="post__action-emoji">{post.likes.myReaction}</span>
              ) : (
                <IconThumbOutline />
              )}
              <span>Me gusta</span>
            </button>
          </div>

          <button type="button" className="post__action" onClick={focusComposer}>
            <IconComment />
            <span>Comentar</span>
          </button>

          <button type="button" className="post__action" onClick={() => setShareOpen(true)}>
            <IconShare />
            <span>Compartir</span>
          </button>
        </div>

        {/* ----------------------- COMENTARIOS ------------------------ */}
        <div className="post__comments">
          <ListComments
            listComData={post.comments}
            now={now}
            onReply={addReply}
            onLike={toggleCommentLike}
          />
          <CommentForm ref={inputRef} getCommentData={handleComment} />
        </div>
      </article>

      {shareOpen && (
        <ShareModal post={post} now={now} onCancel={() => setShareOpen(false)} onConfirm={confirmShare} />
      )}

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </>
  )
}
