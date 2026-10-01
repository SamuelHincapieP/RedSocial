import { useEffect } from 'react'
import Avatar from './Avatar'
import { IconClose, IconGlobe } from './Icons'
import { formatRelativeTime } from '../utils/time'

/** Ventana "Compartir publicación" (estilo Facebook) */
export default function ShareModal({ post, now, onCancel, onConfirm }) {
  /* useEffect: cerrar con la tecla Escape */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="modal-backdrop" onClick={onCancel} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Compartir publicación"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__header">
          <h2>Compartir publicación</h2>
          <button type="button" className="modal__close" onClick={onCancel} aria-label="Cerrar">
            <IconClose />
          </button>
        </header>

        <div className="modal__body">
          <div className="share-as">
            <Avatar user={post.author} size={40} />
            <div>
              <strong>{post.author.name}</strong>
              <span className="share-as__privacy">
                <IconGlobe /> Público
              </span>
            </div>
          </div>

          <div className="share-preview">
            <div className="share-preview__text">{post.text.slice(0, 120)}…</div>
            <div className="share-preview__meta">
              Compartido por primera vez · {formatRelativeTime(post.createdAt, now)}
            </div>
          </div>

          <input
            className="share-message"
            type="text"
            placeholder="Escribe un mensaje (opcional)"
            aria-label="Escribe un mensaje (opcional)"
          />
        </div>

        <footer className="modal__footer">
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="btn btn--primary" onClick={onConfirm}>
            Compartir ahora
          </button>
        </footer>
      </div>
    </div>
  )
}
