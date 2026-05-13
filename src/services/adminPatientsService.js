import { adminPatients } from './adminMockDatabase.js'
import { wait } from './adminServiceUtils.js'

export async function fetchPsychologistPatients(psychologistId) {
  await wait(180)

  return adminPatients.filter((patient) => patient.psychologistId === psychologistId)
}