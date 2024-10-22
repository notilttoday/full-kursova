/* eslint-disable import/no-default-export */

'use client'

import { WithoutProfile } from '@boilerplate/dashboard/store/without-profile'

import { SignIn } from '@boilerplate/dashboard/components/forms/sign-in.form'

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => (
  <WithoutProfile>
    <SignIn />
  </WithoutProfile>
)

export default SignInPage
