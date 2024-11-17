/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

interface DashboardContactMessagesPageProps {}

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Dashboard for TailAdmin Dashboard Template',
}

export const DashboardContactMessagesPage: React.FC<DashboardContactMessagesPageProps> = () => (
  <WithProfile>Contact Messages</WithProfile>
)

export default DashboardContactMessagesPage
