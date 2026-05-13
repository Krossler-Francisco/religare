import { useEffect, useState } from 'react'
import { useAdminSession } from '../services/adminAuthService.js'
import { fetchPsychologistPatients } from '../services/adminPatientsService.js'

function AdminPatientsPage() {
  const [patients, setPatients] = useState([])
  const adminSession = useAdminSession()

  useEffect(() => {
    let isMounted = true

    const loadPatients = async () => {
      const response = await fetchPsychologistPatients(adminSession?.psychologistId)

      if (isMounted) {
        setPatients(response)
      }
    }

    loadPatients()

    return () => {
      isMounted = false
    }
  }, [adminSession?.psychologistId])

  return (
    <section className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Pacientes</p>
          <h2 className="font-display mt-2 text-2xl leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
            Carteira do psicologo logado.
          </h2>
        </div>
        <span className="text-sm text-[#8f7a73]">{patients.length} pacientes visiveis</span>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {patients.map((patient) => (
          <article key={patient.id} className="rounded-2xl border border-[#e2d2ca] bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <strong className="text-xl text-[#351818]">{patient.name}</strong>
                <p className="mt-1 text-sm text-[#8f7a73]">{patient.id}</p>
              </div>
              <span className="inline-flex rounded-full bg-[#fff1ec] px-3 py-1 text-xs font-semibold text-[#830910]">
                {patient.stage}
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-[#655651] sm:grid-cols-2">
              <div className="rounded-lg bg-[rgba(159,15,23,0.05)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8f7a73]">Frequencia</p>
                <p className="mt-1 font-semibold text-[#351818]">{patient.frequency}</p>
              </div>
              <div className="rounded-lg bg-[rgba(159,15,23,0.05)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8f7a73]">Proxima sessao</p>
                <p className="mt-1 font-semibold text-[#351818]">{patient.nextSession}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AdminPatientsPage