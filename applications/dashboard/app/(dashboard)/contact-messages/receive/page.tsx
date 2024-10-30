/* eslint-disable import/no-default-export */

import { type Metadata } from 'next'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { ReceiveContactMessagePage } from '@boilerplate/dashboard/components/forms/receive-contact-message.form'

interface DashboardReceiveContactMessagePageProps { }

export const metadata: Metadata = {
  title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
  description: 'This is Next.js Dashboard for TailAdmin Dashboard Template',
}

export const DashboardReceiveContactMessagePage: React.FC<DashboardReceiveContactMessagePageProps> = () => (
  <WithProfile>
    <ReceiveContactMessagePage />
  </WithProfile>
)

export default DashboardReceiveContactMessagePage
