/** Avatar circular con iniciales (no necesita internet) */
export default function Avatar({ user, size = 40 }) {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        background: user.color,
        fontSize: Math.round(size * 0.4),
      }}
      aria-label={user.name}
      title={user.name}
    >
      {user.initials}
    </div>
  )
}
