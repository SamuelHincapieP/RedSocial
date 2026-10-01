import { createId } from '../utils/id'

/* ---------------------------------------------------------------
 *  Usuarios de ejemplo (los avatares son SVG generados, no
 *  dependen de internet: el post se ve igual en cualquier equipo)
 * --------------------------------------------------------------- */
export const me = {
  id: 'u_me',
  name: 'Samuel',
  fullName: 'Samuel Pérez',
  initials: 'SM',
  color: '#0866FF',
}

export const users = {
  carlos: { id: 'u_1', name: 'Carlos Rodríguez', initials: 'CR', color: '#E4405F' },
  ana: { id: 'u_2', name: 'Ana García', initials: 'AG', color: '#1B8A5A' },
  luis: { id: 'u_3', name: 'Luis Mendoza', initials: 'LM', color: '#8B5CF6' },
}

/* ---------------------------------------------------------------
 *  Foto de la publicación: una imagen SVG embebida en Base64-URI
 *  así el post "igualito al de Facebook" tiene foto aunque no
 *  haya conexión a internet.
 * --------------------------------------------------------------- */
const photoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdf7ec"/>
      <stop offset="100%" stop-color="#f1e4cb"/>
    </linearGradient>
    <linearGradient id="glaze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffe483"/>
      <stop offset="100%" stop-color="#f0b429"/>
    </linearGradient>
    <linearGradient id="sponge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fffdf6"/>
      <stop offset="100%" stop-color="#f6e9cf"/>
    </linearGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>

  <rect width="800" height="500" fill="url(#bg)"/>
  <ellipse cx="400" cy="440" rx="330" ry="55" fill="#3a2b12" opacity="0.12" filter="url(#soft)"/>
  <ellipse cx="400" cy="410" rx="320" ry="72" fill="#ffffff"/>
  <ellipse cx="400" cy="404" rx="298" ry="60" fill="#f8f3e9"/>

  <!-- rebanada de postre (tres leches de maracuyá) -->
  <path d="M270 400 L270 250 L530 250 L530 400 Z" fill="url(#sponge)"/>
  <path d="M270 300 H530" stroke="#eadfca" stroke-width="7"/>
  <path d="M270 348 H530" stroke="#eadfca" stroke-width="7"/>
  <path d="M270 400 H530" stroke="#e6d9be" stroke-width="4"/>

  <!-- cobertura de maracuyá -->
  <path d="M262 252 q10 -28 42 -28 H508 q32 0 42 28 Z" fill="url(#glaze)"/>
  <rect x="262" y="250" width="276" height="20" fill="#f0b429"/>
  <path d="M300 268 q14 26 30 4 q12 -18 26 2" stroke="#f0b429" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M470 268 q12 22 26 4 q10 -14 22 4" stroke="#f0b429" stroke-width="9" fill="none" stroke-linecap="round"/>

  <!-- semillas de maracuyá -->
  <g fill="#2f2208">
    <ellipse cx="322" cy="240" rx="7" ry="5"/>
    <ellipse cx="382" cy="233" rx="7" ry="5"/>
    <ellipse cx="442" cy="241" rx="7" ry="5"/>
    <ellipse cx="497" cy="234" rx="7" ry="5"/>
    <ellipse cx="352" cy="261" rx="6" ry="4"/>
    <ellipse cx="466" cy="262" rx="6" ry="4"/>
  </g>

  <path d="M304 236 q58 -13 128 -9" stroke="#fff7d1" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.9"/>
</svg>`

export const postPhoto = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(photoSvg)}`

/* ---------------------------------------------------------------
 *  Fecha de la publicación: hace 4 horas
 * --------------------------------------------------------------- */
const hoursAgo = (h) => new Date(Date.now() - h * 3_600_000).toISOString()

/* ---------------------------------------------------------------
 *  Semilla de la publicación. Todos los IDs se generan con
 *  createId() (ver src/utils/id.js) => NUNCA se repiten.
 * --------------------------------------------------------------- */
export function createSeedPost() {
  const replyId = createId('reply')

  return {
    id: createId('post'), // 👈 ID ÚNICO (corregido)
    author: me,
    createdAt: hoursAgo(4),
    privacy: 'public',
    text: `🍰 ¡Listo! Terminé la tarea del Post de Facebook usando los hooks de React que vimos en clase, y de premio les comparto el Postre 3 Leches Con Maracuyá. Con useState guardo los likes, los comentarios y las respuestas; con useEffect cargo y guardo la publicación en el localStorage y mantengo actualizado el tiempo relativo ("Hace 3 h"); y con useContext comparto el estado entre todos los componentes sin tener que pasar props nivel por nivel. Lo más chévere fue ver cómo con muy pocas líneas todo el post se vuelve interactivo: puedes dar like con reacciones, responder comentarios y compartir la publicación. ¿Qué les pareció? ¡Déjenme sus comentarios! 👇`,
    image: postPhoto,
    likes: { base: 12, myReaction: null }, // 👍 ❤️ 😆 😮 😢 😡
    shares: 3,
    comments: [
      // 👇 Los dos comentarios que aparecen en el video del profe.
      // Cada uno se crea con createId('comment') => IDs distintos (sin "duplicate key")
      {
        id: createId('comment'),
        author: users.ana,
        text: 'Me gustan mucho los postres',
        createdAt: hoursAgo(3.6),
        likes: { base: 1, mine: false },
        replies: [],
      },
      {
        id: createId('comment'),
        author: users.luis,
        text: 'Pasame la receta',
        createdAt: hoursAgo(3.4),
        likes: { base: 0, mine: false },
        replies: [],
      },
      {
        id: createId('comment'),
        author: users.carlos,
        text: '¡Quedó genial el post! Se ve igualito al de Facebook 👏',
        createdAt: hoursAgo(3),
        likes: { base: 2, mine: false },
        replies: [
          {
            id: replyId, // respuesta -> id propio y único
            author: me,
            text: '¡Gracias Carlos! Lo más difícil fue anidar las respuestas sin perder el id 😅',
            createdAt: hoursAgo(2),
            likes: { base: 1, mine: false },
          },
        ],
      },
      {
        id: createId('comment'),
        author: users.ana,
        text: 'Usaste muy bien el useContext, así no hay que estar pasando props en cada nivel 🙌',
        createdAt: hoursAgo(1),
        likes: { base: 3, mine: false },
        replies: [],
      },
      {
        id: createId('comment'),
        author: users.luis,
        text: 'El useEffect que guarda en el localStorage quedó perfecto, ya no se pierde nada al recargar 🔥',
        createdAt: hoursAgo(0.5),
        likes: { base: 0, mine: false },
        replies: [],
      },
    ],
  }
}
