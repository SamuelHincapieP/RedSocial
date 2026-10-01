import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PostProvider } from './context/PostContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <PostProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PostProvider>
    </BrowserRouter>
  )
}

export default App
