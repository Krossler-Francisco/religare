import { adminAnalyticsSnapshot } from './adminMockDatabase.js'
import { wait } from './adminServiceUtils.js'

export async function fetchAdminAnalytics() {
  await wait(180)

  return adminAnalyticsSnapshot
}