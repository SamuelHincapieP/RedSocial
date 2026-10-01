import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <div className="w3-container w3-content" style={{ maxWidth: 800, marginTop: 100 }}>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container w3-padding">
          <h2 className="w3-center">Panel de Administración</h2>
          <p className="w3-center">Bienvenido al panel de administración</p>
          <div className="w3-panel w3-green">
            <p>Has iniciado sesión correctamente. Esta es una ruta restringida.</p>
          </div>
          <button className="w3-button w3-red" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
