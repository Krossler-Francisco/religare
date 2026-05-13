const SESSION_KEY = 'religare.admin.session'

const mockPsychologists = [
  { id: 'ricardo-falleiros', name: 'Ricardo Falleiros', specialty: 'Psicologia clinica' },
  { id: 'samuel', name: 'Samuel', specialty: 'Terapia cognitivo-comportamental' },
  { id: 'giovani', name: 'Giovani', specialty: 'Atendimento psicologico' },
]

const wait = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

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

  return session
}

export function getAdminSession() {
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

export function logoutAdmin() {
  window.sessionStorage.removeItem(SESSION_KEY)
}