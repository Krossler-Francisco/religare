import { FiCornerUpLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function SiteHeader({ navItems = [], backTo, backLabel }) {
  return (
    <header
      className={`flex w-full ${
        backTo
          ? 'flex-row items-center justify-between gap-3'
          : 'flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
      }`}
    >
      <Link to="/" className="inline-flex items-center gap-3 text-[#351818]">
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
        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-base font-medium text-[#655651] sm:text-lg">
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
      )}
    </header>
  )
}

export default SiteHeader