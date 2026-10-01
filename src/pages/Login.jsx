import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/admin')
    } else {
      alert('Credenciales incorrectas. Usa admin/admin')
    }
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 400, marginTop: 100 }}>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container w3-padding">
          <h2 className="w3-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <p>
              <label><i className="fa fa-user"></i> Usuario</label>
              <input
                className="w3-input w3-border"
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </p>
            <p>
              <label><i className="fa fa-lock"></i> Contraseña</label>
              <input
                className="w3-input w3-border"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </p>
            <p>
              <button className="w3-button w3-block w3-theme" type="submit">
                Iniciar Sesión
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
