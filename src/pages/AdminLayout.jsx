import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar.jsx'
import { getAdminSession, logoutAdmin } from '../services/adminAuthService.js'

const pageTitles = {
  '/admin/visao-geral': {
    eyebrow: 'Resumo operacional',
    title: 'Visao geral do painel',
    description: 'Acompanhe o funil, a operacao e os indicadores centrais do atendimento.',
  },
  '/admin/fila-de-entrada': {
    eyebrow: 'Fila de entrada',
    title: 'Solicitacoes e triagens',
    description: 'Veja quem entrou no sistema, em que etapa esta e para quem foi atribuido.',
  },
  '/admin/agenda': {
    eyebrow: 'Agenda',
    title: 'Calendario',
    description: 'Organize entrevistas, sessoes e retornos a partir da agenda do psicologo.',
  },
  '/admin/analytics': {
    eyebrow: 'Analytics',
    title: 'Funil e desempenho',
    description: 'Entenda visitas, formularios, entrevistas e conversao em pacientes.',
  },
  '/admin/pacientes': {
    eyebrow: 'Pacientes',
    title: 'Gestao de pacientes por psicologo',
    description: 'Cada profissional visualiza e organiza apenas a propria carteira de pacientes.',
  },
}

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const adminSession = getAdminSession()
  const pageData = pageTitles[location.pathname] ?? pageTitles['/admin/visao-geral']

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login', { replace: true })
  }

  return (
    <main className="min-h-screen w-full lg:pl-70">
      <AdminSidebar onLogout={handleLogout} />

      <div className="min-h-screen px-3 py-3 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        <header className="overflow-hidden rounded-[1.5rem] border border-[#e2d2ca] bg-[#fffaf5] px-4 py-3 shadow-[0_18px_50px_rgba(107,28,31,0.1)] sm:rounded-[1.75rem] sm:px-6 sm:py-5 lg:px-8">
          <div className="mb-3 flex items-center justify-between rounded-xl bg-[rgba(159,15,23,0.05)] py-2.5 pr-3 pl-13 lg:hidden">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#830910]">
                Painel Religare
              </p>
              <p className="mt-0.5 text-[0.92rem] font-medium leading-tight text-[#351818]">
                {adminSession?.psychologistName}
              </p>
            </div>
            <div className="rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-[#655651] shadow-[0_6px_14px_rgba(107,28,31,0.08)]">
              Online
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-5">
            <div className="max-w-3xl pt-1 lg:pt-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#830910] sm:text-sm">
                {pageData.eyebrow}
              </p>
              <h1 className="font-display mt-2 text-[1.7rem] leading-[0.95] tracking-[-0.04em] text-[#351818] sm:mt-3 sm:text-5xl">
                {pageData.title}
              </h1>
              <p className="mt-2 max-w-2xl text-[0.98rem] leading-6 text-[#655651] sm:mt-4 sm:text-lg sm:leading-8">
                {pageData.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <div className="hidden text-sm text-[#655651] lg:block">
                Psicologo conectado: <span className="font-semibold text-[#351818]">{adminSession?.psychologistName}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-4 sm:mt-6">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AdminLayout