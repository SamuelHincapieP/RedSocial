/**
 * ============================================================
 *  🔧 CORRECCIÓN DEL ERROR DEL ID DEL POST  (Nivel 4.5)
 * ============================================================
 *
 *  En el video el error ocurre porque el ID se generaba con:
 *
 *      id: Date.now()
 *
 *  `Date.now()` devuelve MILISEGUNDOS. Si creas dos elementos
 *  muy rápido (por ejemplo: un comentario y su respuesta, o dos
 *  likes/comentarios en el mismo instante), ¡ambos obtienen el
 *  MISMO id! Eso provoca:
 *
 *      - Claves duplicadas en React ("Encountered two children
 *        with the same key")
 *      - El "id del post" que se ve mal al final del video
 *      - Que borrar/editar un elemento afecte a otro erroneamente
 *
 *  SOLUCIÓN: un generador que combina 3 fuentes:
 *      1. prefijo (para saber qué es: post / comentario / respuesta)
 *      2. timestamp (para orden)
 *      3. un contador SECUENCIAL + uuid aleatorio (para que NUNCA
 *         se repita, aunque se generen en el mismo milisegundo)
 * ============================================================
 */

let sequence = 0

/**
 * Crea un ID único y estable.
 * @param {'post'|'comment'|'reply'|'user'} prefix
 * @returns {string} por ejemplo: `post_lx3k9a_1_8f2c1d09`
 */
export function createId(prefix = 'id') {
  sequence += 1

  const uuid =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 8)
      : Math.random().toString(36).slice(2, 10)

  return `${prefix}_${Date.now().toString(36)}_${sequence}_${uuid}`
}
