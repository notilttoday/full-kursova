/* eslint-disable import/no-default-export */

'use client'

import { WithoutProfile } from '@boilerplate/front-end/store/without-profile'

import classes from '@boilerplate/front-end/app/(auth)/styles.module.scss'

export interface AuthRootLayoutProps {
  readonly children: React.ReactNode
}

const AuthRootLayout: React.FC<AuthRootLayoutProps> = ({ children }) => (
  <div className={classes.root}>
    <WithoutProfile>
      <div className={classes.content}>{children}</div>
    </WithoutProfile>
  </div>
)

export default AuthRootLayout
