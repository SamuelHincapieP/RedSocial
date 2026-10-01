/** Muestra de carga (aparece mientras el useEffect "carga" el post) */
export default function Skeleton() {
  return (
    <article className="post skeleton-post" aria-busy="true" aria-label="Cargando publicación">
      <header className="post__header">
        <div className="skeleton skeleton--circle" style={{ width: 40, height: 40 }} />
        <div className="post__header-info">
          <div className="skeleton skeleton--line" style={{ width: 140 }} />
          <div className="skeleton skeleton--line skeleton--sm" style={{ width: 70 }} />
        </div>
      </header>
      <div className="post__content">
        <div className="skeleton skeleton--line" style={{ width: '100%' }} />
        <div className="skeleton skeleton--line" style={{ width: '92%' }} />
        <div className="skeleton skeleton--line" style={{ width: '64%' }} />
      </div>
      <div className="skeleton skeleton--block" />
      <div className="post__actions">
        <div className="skeleton skeleton--line" style={{ width: 90 }} />
        <div className="skeleton skeleton--line" style={{ width: 90 }} />
        <div className="skeleton skeleton--line" style={{ width: 90 }} />
      </div>
    </article>
  )
}
