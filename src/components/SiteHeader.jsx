import { useState } from 'react'
import { FiCornerUpLeft, FiMenu, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function SiteHeader({ navItems = [], backTo, backLabel }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`flex w-full ${
          backTo
            ? 'flex-row items-center justify-between gap-3'
            : 'items-center justify-between gap-3'
        }`}
      >
        <Link to="/" className="inline-flex items-center gap-3 text-[#351818]" onClick={closeMobileMenu}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#9f0f17] text-sm font-extrabold text-[#f7f1e8]">
            R
          </span>
          <span className="text-lg font-semibold">Projeto Religare</span>
        </Link>

        {backTo ? (
          <Link
            to={backTo}
            className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap px-1 text-sm font-semibold text-[#6f4a45] transition hover:text-[#351818] sm:text-base"
          >
            <FiCornerUpLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            {backLabel}
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#d8c5bc] bg-[rgba(255,250,245,0.92)] text-[#351818] transition hover:bg-white sm:hidden"
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              {isMobileMenuOpen ? <FiX className="h-5 w-5" aria-hidden="true" /> : <FiMenu className="h-5 w-5" aria-hidden="true" />}
            </button>

            <nav className="hidden flex-wrap gap-x-6 gap-y-3 text-base font-medium text-[#655651] sm:flex sm:text-lg">
              {navItems.map((item) =>
                item.type === 'route' ? (
                  <Link key={item.label} to={item.to} className="transition hover:text-[#351818]">
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className="transition hover:text-[#351818]">
                    {item.label}
                  </a>
                ),
              )}
            </nav>
          </>
        )}
      </header>

      {!backTo ? (
        <>
          <div
            className={`fixed inset-0 z-40 bg-[rgba(53,24,24,0.22)] backdrop-blur-[2px] transition duration-300 sm:hidden ${
              isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          <nav
            className={`fixed top-0 right-0 z-50 flex h-full w-[min(82vw,340px)] flex-col gap-3 border-l border-[#d8c5bc] bg-[#fffaf5] px-5 py-6 shadow-[-18px_0_50px_rgba(53,24,24,0.12)] transition duration-300 sm:hidden ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#ead8d0] pb-4">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[#830910]">Navegacao</span>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8c5bc] text-[#351818] transition hover:bg-white"
                aria-label="Fechar menu"
                onClick={closeMobileMenu}
              >
                <FiX className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 text-lg font-medium text-[#351818]">
              {navItems.map((item) =>
                item.type === 'route' ? (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-lg px-3 py-3 transition hover:bg-[rgba(159,15,23,0.06)]"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-lg px-3 py-3 transition hover:bg-[rgba(159,15,23,0.06)]"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </nav>
        </>
      ) : null}
    </>
  )
}

export default SiteHeader