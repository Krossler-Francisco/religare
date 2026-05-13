import { useEffect, useMemo, useState } from 'react'
import CustomSelect from '../components/CustomSelect.jsx'
import { fetchPsychologists } from '../services/adminAuthService.js'
import { fetchAdminQueue } from '../services/adminQueueService.js'

const statusOptions = ['Todos', 'Novo', 'Triagem', 'Primeira entrevista', 'Paciente']

function AdminQueuePage() {
  const [entries, setEntries] = useState([])
  const [psychologists, setPsychologists] = useState([])
  const [statusFilter, setStatusFilter] = useState('Todos')

  useEffect(() => {
    let isMounted = true

    const loadQueue = async () => {
      const [queueResponse, psychologistsResponse] = await Promise.all([
        fetchAdminQueue(),
        fetchPsychologists(),
      ])

      if (isMounted) {
        setEntries(queueResponse)
        setPsychologists(psychologistsResponse)
      }
    }

    loadQueue()

    return () => {
      isMounted = false
    }
  }, [])

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesStatus = statusFilter === 'Todos' || entry.status === statusFilter

      return matchesStatus
    })
  }, [entries, statusFilter])

  const psychologistNamesById = useMemo(
    () => Object.fromEntries(psychologists.map((psychologist) => [psychologist.id, psychologist.name])),
    [psychologists],
  )

  return (
    <section className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Fila de entrada</p>
          <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
            Todas as solicitacoes vindas dos formularios.
          </h2>
        </div>

        <div className="w-full sm:w-60">
          <CustomSelect
            name="statusFilter"
            value={statusFilter}
            options={statusOptions}
            placeholder="Filtrar por status"
            onChange={(event) => setStatusFilter(event.target.value)}
            className="min-h-12 w-full rounded-lg border border-[#c7a49a] bg-white px-4 text-sm text-[#351818] outline-none transition focus:border-[#9f0f17] flex items-center"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#e2d2ca] bg-white">
        <div className="hidden grid-cols-[1.1fr_0.8fr_0.8fr_1fr_0.8fr] gap-4 border-b border-[#f1dfd8] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#8f7a73] lg:grid">
          <span>Paciente</span>
          <span>Status</span>
          <span>Urgencia</span>
          <span>Responsavel</span>
          <span>Entrada</span>
        </div>

        <div className="divide-y divide-[#f1dfd8]">
          {filteredEntries.map((entry) => (
            <article key={entry.id} className="grid gap-3 px-5 py-4 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr_0.8fr] lg:items-center">
              <div>
                <strong className="text-base text-[#351818]">{entry.patientName}</strong>
                <p className="text-sm text-[#8f7a73]">{entry.id}</p>
              </div>
              <span className="inline-flex w-fit rounded-full bg-[#fff1ec] px-3 py-1 text-xs font-semibold text-[#830910]">
                {entry.status}
              </span>
              <span className="text-sm text-[#655651]">{entry.urgency}</span>
              {entry.assignedPsychologistId ? (
                <span className="inline-flex w-fit rounded-full bg-[rgba(159,15,23,0.08)] px-3 py-1 text-xs font-semibold text-[#351818]">
                  Assumido por {psychologistNamesById[entry.assignedPsychologistId] ?? 'psicologo'}
                </span>
              ) : (
                <span className="inline-flex w-fit rounded-full bg-[#edf5ef] px-3 py-1 text-xs font-semibold text-[#38614a]">
                  Disponivel
                </span>
              )}
              <span className="text-sm text-[#8f7a73]">{entry.submittedAt}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AdminQueuePage