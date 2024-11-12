/* eslint-disable import/no-default-export */

'use client'

import { WithProfile } from '@boilerplate/dashboard/store/with-profile'

import { DefaultLayout } from '@boilerplate/dashboard/components/layouts/default-layout'

export interface DashboardRootLayoutProps {
  readonly children: React.ReactNode
}

const DashboardRootLayout: React.FC<DashboardRootLayoutProps> = ({ children }) => (
  <WithProfile>
    <DefaultLayout>{children}</DefaultLayout>
  </WithProfile>
)

export default DashboardRootLayout
