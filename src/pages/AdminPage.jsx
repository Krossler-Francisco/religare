import { Link } from 'react-router-dom'

const adminMetrics = [
  { label: 'Novas entradas', value: '12', tone: 'bg-[#fde9e2] text-[#830910]' },
  { label: 'Em triagem', value: '07', tone: 'bg-[#f8e5de] text-[#8a5727]' },
  { label: 'Retornos enviados', value: '19', tone: 'bg-[#f3ebe6] text-[#6f4439]' },
]

const queueItems = [
  {
    status: 'Novo',
    badge: 'bg-[#fde9e2] text-[#830910]',
    channel: 'Formulário web',
    updatedAt: 'Hoje, 09:40',
  },
  {
    status: 'Triagem',
    badge: 'bg-[#f8e5de] text-[#8a5727]',
    channel: 'Fluxo dinâmico',
    updatedAt: 'Hoje, 11:15',
  },
  {
    status: 'Encaminhado',
    badge: 'bg-[#f3ebe6] text-[#6f4439]',
    channel: 'Painel interno',
    updatedAt: 'Ontem, 18:20',
  },
]

function AdminPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] px-6 py-5 shadow-[0_18px_50px_rgba(107,28,31,0.1)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#830910]">
            Área administrativa
          </p>
          <h1 className="font-display mt-2 text-3xl leading-none tracking-[-0.04em] text-[#351818] sm:text-5xl">
            Painel Religare
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#c7a49a] bg-white px-5 text-sm font-semibold text-[#351818] transition hover:bg-[#fff7f4]"
          >
            Voltar para landing
          </Link>
          <Link
            to="/formulario"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#9f0f17] px-5 text-sm font-semibold text-[#f8f4ed] transition hover:bg-[#830910]"
          >
            Ver formulário
          </Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-5 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
            Navegação
          </p>
          <nav className="mt-5 flex flex-col gap-2 text-sm text-[#655651]">
            <a className="rounded-xl bg-[#fff1ec] px-4 py-3 font-medium text-[#351818]" href="#visao-geral">
              Visão geral
            </a>
            <a className="rounded-xl px-4 py-3 transition hover:bg-[#fff1ec] hover:text-[#351818]" href="#fila">
              Fila de entrada
            </a>
            <a className="rounded-xl px-4 py-3 transition hover:bg-[#fff1ec] hover:text-[#351818]" href="#agenda">
              Agenda
            </a>
            <a className="rounded-xl px-4 py-3 transition hover:bg-[#fff1ec] hover:text-[#351818]" href="#atividade">
              Atividade
            </a>
          </nav>
        </aside>

        <div className="flex flex-col gap-6">
          <section
            id="visao-geral"
            className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
                  Resumo operacional
                </p>
                <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-4xl">
                  Acompanhe entradas e andamento do atendimento.
                </h2>
              </div>
              <span className="text-sm text-[#8f7a73]">Atualizado há 5 min</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {adminMetrics.map((item) => (
                <article
                  key={item.label}
                  className="rounded-2xl border border-[#e2d2ca] bg-white p-5"
                >
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                    {item.label}
                  </span>
                  <strong className="mt-4 block text-3xl font-semibold text-[#351818] sm:text-4xl">
                    {item.value}
                  </strong>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div
              id="fila"
              className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
                    Fila de entrada
                  </p>
                  <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
                    Solicitações recentes
                  </h2>
                </div>
                <button className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-[#c7a49a] bg-white px-4 text-sm font-semibold text-[#351818] transition hover:bg-[#fff7f4]">
                  Filtrar
                </button>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-[#e2d2ca] bg-white">
                <div className="hidden grid-cols-[1fr_1.2fr_1fr] gap-4 border-b border-[#f1dfd8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8f7a73] sm:grid">
                  <span>Status</span>
                  <span>Canal</span>
                  <span>Atualização</span>
                </div>

                <div className="divide-y divide-[#f1dfd8]">
                  {queueItems.map((item) => (
                    <article
                      key={`${item.status}-${item.updatedAt}`}
                      className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1.2fr_1fr] sm:items-center"
                    >
                      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}>
                        {item.status}
                      </span>
                      <span className="text-sm text-[#655651]">{item.channel}</span>
                      <span className="text-sm text-[#8f7a73]">{item.updatedAt}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <section
                id="agenda"
                className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
                  Agenda
                </p>
                <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
                  Próximos blocos
                </h2>
                <div className="mt-5 flex flex-col gap-3">
                  {['13:00 Triagem inicial', '15:30 Retorno clínico', '17:00 Revisão de entradas'].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#e2d2ca] bg-white px-4 py-3 text-sm text-[#351818]">
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="atividade"
                className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">
                  Atividade recente
                </p>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#655651]">
                  <p>Nova solicitação recebida e enviada para triagem.</p>
                  <p>Registro atualizado com observações internas.</p>
                  <p>Retorno operacional marcado como concluído.</p>
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default AdminPage