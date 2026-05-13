import { adminQueueEntries } from './adminMockDatabase.js'
import { wait } from './adminServiceUtils.js'

export async function fetchAdminQueue() {
  await wait(180)

  return adminQueueEntries
}