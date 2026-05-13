import { useState } from 'react'
import { FiBarChart2, FiCalendar, FiClipboard, FiGrid, FiLogOut, FiMenu, FiUsers, FiX } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

const mobileMenuButtonClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d8c5bc] bg-white p-0 text-[#351818] shadow-[0_8px_20px_rgba(53,24,24,0.1)]'

function MobileMenuButton({ label, onClick, children, className = '', expanded }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${mobileMenuButtonClass} ${className}`.trim()}
      aria-label={label}
      aria-expanded={expanded}
    >
      {children}
    </button>
  )
}

const navigationItems = [
  { label: 'Visao geral', to: '/admin/visao-geral', icon: FiGrid },
  { label: 'Fila de entrada', to: '/admin/fila-de-entrada', icon: FiClipboard },
  { label: 'Agenda', to: '/admin/agenda', icon: FiCalendar },
  { label: 'Analytics', to: '/admin/analytics', icon: FiBarChart2 },
  { label: 'Pacientes', to: '/admin/pacientes', icon: FiUsers },
]

function SidebarLinks({ onNavigate }) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      {navigationItems.map((item) => {
        const Icon = item.icon

        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-[#fff1ec] text-[#351818]'
                  : 'text-[#655651] hover:bg-[rgba(159,15,23,0.06)] hover:text-[#351818]'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {item.label}
          </NavLink>
        )
      })}
    </div>
  )
}

function AdminSidebar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <MobileMenuButton
        className={`fixed top-3 left-3 z-50 transition lg:hidden ${
          isOpen ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
        label={isOpen ? 'Fechar navegacao do painel' : 'Abrir navegacao do painel'}
        expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <FiMenu className="h-5 w-5" aria-hidden="true" />
      </MobileMenuButton>

      <div
        className={`fixed inset-0 z-30 bg-[rgba(53,24,24,0.22)] backdrop-blur-[2px] transition lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen w-70 flex-col rounded-r-4xl border-r border-[#e2d2ca] bg-[#fffaf5] px-5 py-6 shadow-[18px_0_50px_rgba(107,28,31,0.08)] transition lg:rounded-none lg:translate-x-0 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-[#ead8d0] pb-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
                Painel Religare
              </p>
              <h2 className="font-display mt-3 text-2xl leading-none tracking-[-0.04em] text-[#351818]">
                Navegacao administrativa
              </h2>
            </div>

            <MobileMenuButton
              onClick={() => setIsOpen(false)}
              className="lg:hidden"
              label="Fechar navegacao do painel"
            >
              <FiX className="h-5 w-5" aria-hidden="true" />
            </MobileMenuButton>
          </div>
        </div>

        <SidebarLinks onNavigate={() => setIsOpen(false)} />

        <div className="mt-auto border-t border-[#ead8d0] pt-5">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false)
              onLogout()
            }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#655651] transition hover:bg-[rgba(159,15,23,0.06)] hover:text-[#351818]"
          >
            <FiLogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar