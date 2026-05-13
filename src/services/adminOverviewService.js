import { adminOverviewSnapshot } from './adminMockDatabase.js'
import { wait } from './adminServiceUtils.js'

export async function fetchAdminOverview() {
  await wait(180)

  return adminOverviewSnapshot
}