import { forwardRef, useState } from 'react'
import Avatar from './Avatar'
import { IconCamera, IconSmile } from './Icons'
import { me } from '../data/seed'

/**
 * CommentForm  (nombre y prop igual que en el video: <CommentForm getCommentData={getCommentData} />)
 * Caja para escribir un comentario (abajo del post).
 * Usa useState para el texto y ref para enfocarse cuando se hace
 * clic en el botón "Comentar".
 */
const CommentForm = forwardRef(function CommentForm(
  { getCommentData, placeholder = 'Escribe un comentario...', autoFocus = false, compact = false },
  ref
) {
  const [text, setText] = useState('')

  const submit = () => {
    const clean = text.trim()
    if (!clean) return
    getCommentData(clean) // le entrega el dato al componente padre (igual que en el video)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form
      className={`comment-form ${compact ? 'comment-form--compact' : ''}`}
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      {!compact && <Avatar user={me} size={32} />}
      <div className="comment-form__box">
        <input
          ref={ref}
          type="text"
          className="comment-form__input"
          placeholder={placeholder}
          value={text}
          autoFocus={autoFocus}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={placeholder}
        />
        <div className="comment-form__icons">
          <button type="button" className="icon-btn" aria-label="Agregar foto" tabIndex={-1}>
            <IconCamera />
          </button>
          <button type="button" className="icon-btn" aria-label="Agregar emoji" tabIndex={-1}>
            <IconSmile />
          </button>
        </div>
      </div>
    </form>
  )
})

export default CommentForm
