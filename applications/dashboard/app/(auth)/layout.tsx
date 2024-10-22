/* eslint-disable import/no-default-export */

'use client'

import clsx from 'clsx'

import { WithoutProfile } from '@boilerplate/dashboard/store/without-profile'

export interface AuthRootLayoutProps {
  readonly children: React.ReactNode
}

const AuthRootLayout: React.FC<AuthRootLayoutProps> = ({ children }) => (
  <div className={clsx('w-screen', 'h-screen', 'flex', 'items-center', 'justify-center')}>
    <div className={clsx('min-w-96')}>
      <WithoutProfile>{children}</WithoutProfile>
    </div>
  </div>
)

export default AuthRootLayout
