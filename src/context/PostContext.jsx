import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createSeedPost, me } from '../data/seed'
import { createId } from '../utils/id'

/* =================================================================
 *  POST CONTEXT  →  uso de HOOK: useContext  (nivel 5.0)
 *  ---------------------------------------------------------------
 *  Aquí vive TODO el estado del post (likes, reacciones, comentarios,
 *  respuestas y compartidos). De aquí lo consumen todos los
 *  componentes, así evitamos "prop drilling" (pasar props por niveles).
 *
 *  Hooks utilizados dentro de este archivo:
 *   • useState   -> el estado del post, la carga y el reloj
 *   • useEffect  -> cargar/guardar en localStorage + reloj relativo
 *   • useContext -> el hook personalizado usePost()
 * ================================================================= */

const STORAGE_KEY = 'tarea-post-facebook-hooks-v1'
const LOADING_TIME = 600 // ms: simula la petición al "servidor"

const PostContext = createContext(null)

export function PostProvider({ children }) {
  const [post, setPost] = useState(null) // null = aún está cargando
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(() => Date.now()) // reloj para "Hace 3 h"

  /* ----------------------------------------------------------------
   * useEffect #1 -> CARGAR la publicación (una sola vez) y arrancar
   * el reloj que hace que el tiempo relativo se actualice solo.
   * Devuelve la "limpieza" (cleanup) para cancelar timer e interval.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    let alive = true

    const load = setTimeout(() => {
      if (!alive) return
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY)
        if (saved) {
          setPost(JSON.parse(saved))
        } else {
          setPost(createSeedPost())
        }
      } catch {
        setPost(createSeedPost()) // si el storage está corrupto, datos de ejemplo
      }
      setLoading(false)
    }, LOADING_TIME)

    const clock = setInterval(() => setNow(Date.now()), 30_000)

    return () => {
      alive = false
      clearTimeout(load)
      clearInterval(clock)
    }
  }, []) // [] = solo se ejecuta al montar el componente

  /* ----------------------------------------------------------------
   * useEffect #2 -> GUARDAR cada cambio en el localStorage
   * Se ejecuta cada vez que `post` cambia (likes, comentarios, etc.)
   * ---------------------------------------------------------------- */
  useEffect(() => {
    if (loading || !post) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(post))
    } catch {
      /* storage lleno o bloqueado: la app sigue funcionando en memoria */
    }
  }, [post, loading])

  /* ---------------------- ACCIONES (useEffect de estado) ---------------------- */

  /** Like / reacción del post: 👍 ❤️ 😆 😮 😢 😡  (null = quitar) */
  const setReaction = useCallback((reaction) => {
    setPost((prev) => (prev ? { ...prev, likes: { ...prev.likes, myReaction: reaction } } : prev))
  }, [])

  /** Comentar en el post */
  const addComment = useCallback((text) => {
    const clean = text.trim()
    if (!clean) return
    setPost((prev) =>
      prev
        ? {
            ...prev,
            comments: [
              ...prev.comments,
              {
                id: createId('comment'), // 👈 id único, nunca duplicado
                author: me,
                text: clean,
                createdAt: new Date().toISOString(),
                likes: { base: 0, mine: false },
                replies: [],
              },
            ],
          }
        : prev
    )
  }, [])

  /** Responder un comentario (o una respuesta: se anida 1 nivel, como Facebook) */
  const addReply = useCallback((commentId, text) => {
    const clean = text.trim()
    if (!clean) return
    setPost((prev) =>
      prev
        ? {
            ...prev,
            comments: prev.comments.map((c) =>
              c.id === commentId
                ? {
                    ...c,
                    replies: [
                      ...c.replies,
                      {
                        id: createId('reply'), // 👈 id único para la respuesta
                        author: me,
                        text: clean,
                        createdAt: new Date().toISOString(),
                        likes: { base: 0, mine: false },
                      },
                    ],
                  }
                : c
            ),
          }
        : prev
    )
  }, [])

  /** Like a un comentario o a una respuesta */
  const toggleCommentLike = useCallback((commentId, replyId = null) => {
    const flip = (item) => ({ ...item, likes: { ...item.likes, mine: !item.likes.mine } })

    setPost((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        comments: prev.comments.map((c) => {
          if (c.id !== commentId) return c
          if (!replyId) return flip(c)
          return { ...c, replies: c.replies.map((r) => (r.id === replyId ? flip(r) : r)) }
        }),
      }
    })
  }, [])

  /** Compartir la publicación */
  const sharePost = useCallback(() => {
    setPost((prev) => (prev ? { ...prev, shares: prev.shares + 1 } : prev))
  }, [])

  /** Restablecer la tarea a los datos de ejemplo */
  const resetPost = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setPost(createSeedPost())
  }, [])

  const totalComments = useMemo(
    () => (post ? post.comments.reduce((n, c) => n + 1 + c.replies.length, 0) : 0),
    [post]
  )

  const totalLikes = useMemo(
    () => (post ? post.likes.base + (post.likes.myReaction ? 1 : 0) : 0),
    [post]
  )

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  )

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

/** Hook personalizado que usa useContext (nivel 5.0) */
export function usePost() {
  const ctx = useContext(PostContext)
  if (!ctx) {
    throw new Error('usePost() debe usarse dentro de <PostProvider>')
  }
  return ctx
}
