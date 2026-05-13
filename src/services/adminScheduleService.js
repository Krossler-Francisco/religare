import { adminCalendarEventTemplates } from './adminMockDatabase.js'
import { wait } from './adminServiceUtils.js'

const monthFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'long',
  year: 'numeric',
})

const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
})

const getCurrentMonthMeta = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  return {
    year,
    month,
    firstDay,
    lastDay,
    monthLabel: monthFormatter.format(firstDay),
  }
}

const toIsoDate = (year, month, day) => {
  const normalizedMonth = `${month + 1}`.padStart(2, '0')
  const normalizedDay = `${day}`.padStart(2, '0')

  return `${year}-${normalizedMonth}-${normalizedDay}`
}

export async function fetchAdminSchedule() {
  await wait(180)

  const { year, month, firstDay, lastDay, monthLabel } = getCurrentMonthMeta()

  const eventsByDate = Object.fromEntries(
    adminCalendarEventTemplates.map((item) => [toIsoDate(year, month, item.day), item.events]),
  )

  return {
    monthLabel,
    currentDate: toIsoDate(year, month, new Date().getDate()),
    weekdayLabels: Array.from({ length: 7 }, (_, index) => {
      const date = new Date(2026, 4, 3 + index)
      return weekdayFormatter.format(date).replace('.', '')
    }),
    firstWeekday: firstDay.getDay(),
    daysInMonth: lastDay.getDate(),
    eventsByDate,
  }
}