/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { DefaultLayout } from '@boilerplate/dashboard/components/layouts/default-layout'

interface DashboardPageProps {}

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Dashboard for TailAdmin Dashboard Template',
}

export const DashboardPage: React.FC<DashboardPageProps> = () => (
  <WithProfile>
    <DefaultLayout>Hello, world!</DefaultLayout>
  </WithProfile>
)

export default DashboardPage
