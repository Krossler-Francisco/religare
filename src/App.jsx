import { Navigate, Route, Routes } from 'react-router-dom'
import AdminPage from './pages/AdminPage.jsx'
import FormularioPage from './pages/FormularioPage.jsx'
import LandingPage from './pages/LandingPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/formulario" element={<FormularioPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
