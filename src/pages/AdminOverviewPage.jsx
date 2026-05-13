import { useEffect, useState } from 'react'
import { fetchAdminOverview } from '../services/adminOverviewService.js'

function AdminOverviewPage() {
  const [overview, setOverview] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadOverview = async () => {
      const response = await fetchAdminOverview()

      if (isMounted) {
        setOverview(response)
      }
    }

    loadOverview()

    return () => {
      isMounted = false
    }
  }, [])

  if (!overview) {
    return <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6">Carregando...</div>
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
              Snapshot
            </p>
            <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-4xl">
              Panorama do funil e da operacao.
            </h2>
          </div>
          <span className="text-sm text-[#8f7a73]">Atualizado: {overview.updatedAt}</span>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-4">
          {overview.metrics.map((item) => (
            <article key={item.label} className="rounded-2xl border border-[#e2d2ca] bg-white p-5">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                {item.label}
              </span>
              <strong className="mt-4 block text-3xl font-semibold text-[#351818] sm:text-4xl">
                {item.value}
              </strong>
              <p className="mt-2 text-sm text-[#8f7a73]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Funil</p>
          <div className="mt-5 grid gap-4">
            {overview.funnel.map((item) => (
              <article key={item.id} className="rounded-2xl bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#351818]">{item.label}</span>
                  <span className="text-sm text-[#8f7a73]">{item.value}</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f3e5de]">
                  <div className="h-full rounded-full bg-[#9f0f17]" style={{ width: `${item.ratio}%` }} />
                </div>
                <p className="mt-2 text-sm text-[#8f7a73]">{item.ratio}% da base inicial</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Operacao</p>
          <div className="mt-5 space-y-4">
            {overview.operationalBreakdown.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-base text-[#351818]">{item.label}</strong>
                  <span className="text-sm text-[#8f7a73]">{item.count} casos</span>
                </div>
                <p className="mt-2 text-sm text-[#655651]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminOverviewPage