import { useSyncExternalStore } from 'react'

const SESSION_KEY = 'religare.admin.session'
const SESSION_EVENT = 'religare-admin-session-change'

const mockPsychologists = [
  { id: 'ricardo-falleiros', name: 'Ricardo Falleiros', specialty: 'Psicologia clinica' },
  { id: 'samuel', name: 'Samuel', specialty: 'Terapia cognitivo-comportamental' },
  { id: 'giovani', name: 'Giovani', specialty: 'Atendimento psicologico' },
]

const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

const readAdminSession = () => {
  const rawSession = window.sessionStorage.getItem(SESSION_KEY)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession)
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY)

    return null
  }
}

const notifyAdminSessionChange = () => {
  window.dispatchEvent(new Event(SESSION_EVENT))
}

const subscribeToAdminSession = (callback) => {
  const handleSessionChange = () => {
    callback()
  }

  window.addEventListener(SESSION_EVENT, handleSessionChange)
  window.addEventListener('storage', handleSessionChange)

  return () => {
    window.removeEventListener(SESSION_EVENT, handleSessionChange)
    window.removeEventListener('storage', handleSessionChange)
  }
}

export async function fetchPsychologists() {
  await wait(250)

  return mockPsychologists
}

export async function loginAdmin({ psychologistId, password }) {
  await wait(250)

  const psychologist = mockPsychologists.find((item) => item.id === psychologistId)

  if (!psychologist) {
    throw new Error('Selecione um psicologo valido.')
  }

  if (password !== 'admin') {
    throw new Error('Senha incorreta.')
  }

  const session = {
    psychologistId: psychologist.id,
    psychologistName: psychologist.name,
  }

  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  notifyAdminSessionChange()

  return session
}

export function getAdminSession() {
  return readAdminSession()
}

export function logoutAdmin() {
  window.sessionStorage.removeItem(SESSION_KEY)
  notifyAdminSessionChange()
}

export function useAdminSession() {
  return useSyncExternalStore(subscribeToAdminSession, getAdminSession, () => null)
}