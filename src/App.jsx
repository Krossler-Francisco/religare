import { Navigate, Route, Routes } from 'react-router-dom'
import { useAdminSession } from './services/adminAuthService.js'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage.jsx'
import AdminLayout from './pages/AdminLayout.jsx'
import AdminLoginPage from './pages/AdminLoginPage.jsx'
import AdminOverviewPage from './pages/AdminOverviewPage.jsx'
import AdminPatientsPage from './pages/AdminPatientsPage.jsx'
import AdminQueuePage from './pages/AdminQueuePage.jsx'
import AdminSchedulePage from './pages/AdminSchedulePage.jsx'
import FormularioPage from './pages/FormularioPage.jsx'
import LandingPage from './pages/LandingPage.jsx'

function App() {
  const adminSession = useAdminSession()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/formulario" element={<FormularioPage />} />
      <Route
        path="/admin/login"
        element={adminSession ? <Navigate to="/admin" replace /> : <AdminLoginPage />}
      />
      <Route
        path="/admin"
        element={adminSession ? <AdminLayout /> : <Navigate to="/admin/login" replace />}
      >
        <Route index element={<Navigate to="visao-geral" replace />} />
        <Route path="visao-geral" element={<AdminOverviewPage />} />
        <Route path="fila-de-entrada" element={<AdminQueuePage />} />
        <Route path="agenda" element={<AdminSchedulePage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="pacientes" element={<AdminPatientsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
