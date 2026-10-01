/**
 * Tiempo relativo estilo Facebook: "Justo ahora", "Hace 5 min", "Hace 3 h"...
 * Se le pasa `now` (estado del reloj que vive en el Context) para que
 * TODOS los componentes se actualicen con un solo setInterval (useEffect).
 */
export function formatRelativeTime(iso, now = Date.now()) {
  const created = new Date(iso).getTime()
  const diff = Math.max(0, now - created)

  const minutes = Math.floor(diff / 60_000)
  if (minutes < 1) return 'Justo ahora'
  if (minutes < 60) return `Hace ${minutes} min`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Hace ${hours} h`

  const days = Math.floor(hours / 24)
  if (days < 7) return `Hace ${days} d`

  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** "1 comentario" / "12 comentarios" */
export function commentsLabel(count) {
  return count === 1 ? '1 comentario' : `${count} comentarios`
}

/** "1 vez compartido" / "3 veces compartido" */
export function sharesLabel(count) {
  return count === 1 ? '1 vez compartido' : `${count} veces compartido`
}
