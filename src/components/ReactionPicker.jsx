/**
 * Menú de reacciones estilo Facebook (👍 ❤️ 😆 😮 😢 😡)
 * Aparece al pasar el mouse sobre el botón "Me gusta".
 */
export const REACTIONS = [
  { emoji: '👍', label: 'Me gusta' },
  { emoji: '❤️', label: 'Me encanta' },
  { emoji: '😆', label: 'Me divierte' },
  { emoji: '😮', label: 'Me asombra' },
  { emoji: '😢', label: 'Me entristece' },
  { emoji: '😡', label: 'Me enoja' },
]

export default function ReactionPicker({ onPick, visible }) {
  return (
    <div
      className={`reaction-picker ${visible ? 'is-visible' : ''}`}
      role="menu"
      aria-hidden={!visible}
    >
      {REACTIONS.map(({ emoji, label }, i) => (
        <button
          key={emoji}
          type="button"
          className="reaction-picker__btn"
          style={{ animationDelay: `${i * 35}ms` }}
          title={label}
          aria-label={label}
          onClick={() => onPick(emoji)}
          tabIndex={visible ? 0 : -1}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}
