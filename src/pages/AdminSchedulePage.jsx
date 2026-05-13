import { useEffect, useMemo, useState } from 'react'
import { fetchAdminSchedule } from '../services/adminScheduleService.js'

const eventStyles = {
  form: {
    dot: 'bg-[#9f0f17]',
    badge: 'bg-[#fff1ec] text-[#830910]',
    label: 'Formulario recebido',
  },
  interview: {
    dot: 'bg-[#8a5727]',
    badge: 'bg-[#f8e5de] text-[#8a5727]',
    label: 'Primeira entrevista',
  },
  assignment: {
    dot: 'bg-[#38614a]',
    badge: 'bg-[#edf5ef] text-[#38614a]',
    label: 'Paciente assumido',
  },
}

function AdminSchedulePage() {
  const [calendarData, setCalendarData] = useState(null)
  const [activeDate, setActiveDate] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadSchedule = async () => {
      const response = await fetchAdminSchedule()

      if (isMounted) {
        setCalendarData(response)
        setActiveDate(response.currentDate)
      }
    }

    loadSchedule()

    return () => {
      isMounted = false
    }
  }, [])

  const calendarCells = useMemo(() => {
    if (!calendarData) {
      return []
    }

    const leadingEmptyDays = Array.from({ length: calendarData.firstWeekday }, (_, index) => ({
      id: `empty-${index}`,
      empty: true,
    }))

    const realDays = Array.from({ length: calendarData.daysInMonth }, (_, index) => {
      const day = index + 1
      const isoDate = `${calendarData.monthLabel ? '' : ''}`
      const yearMonth = calendarData.currentDate.slice(0, 8)
      const dateKey = `${yearMonth}${`${day}`.padStart(2, '0')}`
      const events = calendarData.eventsByDate[dateKey] ?? []

      return {
        id: dateKey,
        dateKey,
        day,
        events,
        isToday: dateKey === calendarData.currentDate,
      }
    })

    return [...leadingEmptyDays, ...realDays]
  }, [calendarData])

  const activeEvents = calendarData?.eventsByDate[activeDate] ?? []

  if (!calendarData) {
    return <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6">Carregando...</div>
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_320px]">
      <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-4 shadow-[0_18px_50px_rgba(107,28,31,0.08)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Calendario</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <h2 className="font-display text-[1.75rem] leading-none tracking-[-0.04em] text-[#351818] sm:text-3xl">
            {calendarData.monthLabel}
          </h2>
          <p className="text-sm leading-6 text-[#8f7a73] sm:text-right">Toque em um dia para ver os eventos.</p>
        </div>

        <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-[#ead8d0] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(250,239,233,0.85))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] sm:mt-6 sm:rounded-3xl sm:bg-[rgba(255,255,255,0.55)] sm:p-3">
          <div className="grid grid-cols-7 gap-1 text-center text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[#8f7a73] sm:gap-2 sm:text-xs sm:tracking-[0.16em]">
            {calendarData.weekdayLabels.map((label) => (
              <span key={label} className="py-1.5 sm:py-2">
                {label}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1 sm:mt-2 sm:gap-2">
            {calendarCells.map((cell) =>
              cell.empty ? (
                <div key={cell.id} className="aspect-[0.92] rounded-xl border border-transparent sm:aspect-square sm:rounded-2xl" />
              ) : (
                <div
                  key={cell.id}
                  className={`group relative flex aspect-[0.92] flex-col rounded-xl border p-1.5 transition sm:aspect-square sm:rounded-[1.15rem] sm:p-3 ${
                    cell.isToday
                      ? 'border-[#9f0f17] bg-[#fff1ec] shadow-[0_10px_20px_rgba(159,15,23,0.08)]'
                      : 'border-[#e2d2ca] bg-[rgba(255,255,255,0.92)] hover:border-[#c7a49a]'
                  } ${activeDate === cell.dateKey ? 'ring-1 ring-[#c7a49a] shadow-[0_12px_24px_rgba(107,28,31,0.08)]' : ''}`}
                  onMouseEnter={() => setActiveDate(cell.dateKey)}
                  onFocus={() => setActiveDate(cell.dateKey)}
                  onClick={() => setActiveDate(cell.dateKey)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="text-[0.78rem] font-semibold text-[#351818] sm:text-sm">{cell.day}</span>
                    {cell.events.length > 0 ? (
                      <span className="grid h-4 min-w-4 place-items-center rounded-full bg-[rgba(159,15,23,0.08)] px-1 text-[0.55rem] font-semibold text-[#830910] sm:h-6 sm:min-w-6 sm:text-[0.68rem]">
                        {cell.events.length}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto flex min-h-5 flex-wrap items-center gap-1 pt-2 sm:min-h-0 sm:pt-0 sm:mt-3 sm:gap-1.5">
                    {cell.events.length > 0
                      ? cell.events.slice(0, 3).map((event, index) => (
                          <span
                            key={`${cell.dateKey}-${event.patientName}-${index}`}
                            className={`h-2 w-2 rounded-full sm:h-3 sm:w-3 ${eventStyles[event.type].dot}`}
                          />
                        ))
                      : null}
                  </div>

                  {cell.events.length > 0 ? (
                    <div className="pointer-events-none absolute left-0 top-[calc(100%+0.5rem)] z-20 hidden w-72 rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-4 text-left shadow-[0_18px_50px_rgba(107,28,31,0.12)] xl:block xl:opacity-0 xl:transition xl:group-hover:opacity-100">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#830910]">Dia {cell.day}</p>
                      <div className="mt-3 space-y-3">
                        {cell.events.map((event, index) => (
                          <div key={`${cell.dateKey}-hover-${index}`} className="rounded-xl bg-white p-3">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${eventStyles[event.type].badge}`}>
                              {eventStyles[event.type].label}
                            </span>
                            <p className="mt-2 text-sm font-semibold text-[#351818]">{event.time} · {event.patientName}</p>
                            {'interviewStatus' in event ? <p className="text-sm text-[#655651]">Entrevista: {event.interviewStatus}</p> : null}
                            <p className="text-sm text-[#655651]">
                              {event.assignedPsychologistName
                                ? `Assumido por ${event.assignedPsychologistName}`
                                : 'Ainda nao assumido por psicologo'}
                            </p>
                            {'note' in event && event.note ? <p className="mt-1 text-sm text-[#8f7a73]">{event.note}</p> : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e2d2ca] bg-[#fffaf5] p-6 shadow-[0_18px_50px_rgba(107,28,31,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#830910]">Detalhe do dia</p>
        <div className="mt-3 rounded-2xl bg-[rgba(159,15,23,0.05)] px-4 py-3">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#8f7a73]">
            Data selecionada
          </p>
          <p className="mt-1 text-base font-semibold text-[#351818]">
            {activeDate ? activeDate.split('-').reverse().join('/') : ''}
          </p>
        </div>
        <div className="mt-5 space-y-3">
          {activeEvents.length > 0 ? (
            activeEvents.map((event, index) => (
              <div key={`${activeDate}-${event.patientName}-${index}`} className="rounded-2xl bg-white p-4 text-sm text-[#655651]">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${eventStyles[event.type].badge}`}>
                  {eventStyles[event.type].label}
                </span>
                <p className="mt-3 font-semibold text-[#351818]">{event.time} · {event.patientName}</p>
                {'interviewStatus' in event ? <p className="mt-1">Entrevista: {event.interviewStatus}</p> : null}
                <p className="mt-1">
                  {event.assignedPsychologistName
                    ? `Assumido por ${event.assignedPsychologistName}`
                    : 'Ainda nao assumido por psicologo'}
                </p>
                {'note' in event && event.note ? <p className="mt-2 text-[#8f7a73]">{event.note}</p> : null}
              </div>
            ))
          ) : (
            <div className="rounded-2xl bg-white p-4 text-sm text-[#655651]">
              Nenhum evento do projeto para esta data.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AdminSchedulePage