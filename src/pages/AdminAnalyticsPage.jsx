import { useEffect, useState } from 'react'
import { fetchAdminAnalytics } from '../services/adminAnalyticsService.js'

function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadAnalytics = async () => {
      const response = await fetchAdminAnalytics()

      if (isMounted) {
        setAnalytics(response)
      }
    }

    loadAnalytics()

    return () => {
      isMounted = false
    }
  }, [])

  if (!analytics) {
    return <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6">Carregando...</div>
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
      <section className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Funilamento</p>
            <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
              Visitas, formularios e pacientes.
            </h2>
          </div>
          <span className="text-sm text-[#8f7a73]">{analytics.periodLabel}</span>
        </div>

        <div className="mt-6 grid gap-4">
          {analytics.funnelBreakdown.map((item) => (
            <article key={item.label} className="rounded-2xl bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-base text-[#351818]">{item.label}</strong>
                <span className="text-sm text-[#8f7a73]">{item.value}</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f3e5de]">
                <div className="h-full rounded-full bg-[#9f0f17]" style={{ width: `${Math.max(item.percentage, 8)}%` }} />
              </div>
              <p className="mt-2 text-sm text-[#8f7a73]">{item.percentage}% na passagem desta etapa</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Tendencia semanal</p>
        <div className="mt-5 space-y-4">
          {analytics.weeklyVisits.map((item) => (
            <article key={item.label} className="rounded-2xl bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-base text-[#351818]">{item.label}</strong>
                <span className="text-sm text-[#8f7a73]">{item.forms} formularios</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#f3e5de]">
                <div className="h-full rounded-full bg-[#351818]" style={{ width: `${Math.min(item.visits / 4, 100)}%` }} />
              </div>
              <p className="mt-2 text-sm text-[#655651]">{item.visits} visitas na landing nessa semana.</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminAnalyticsPage