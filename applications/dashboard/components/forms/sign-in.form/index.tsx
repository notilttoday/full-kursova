import { Suspense, lazy, useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@boilerplate/dashboard/store'

import { authSlice } from '@boilerplate/dashboard/store/slices/auth.slice'

interface SignInProps {}

const SignInForm = lazy(() => import('@boilerplate/dashboard/components/forms/sign-in.form/form'))

export const SignIn: React.FC<SignInProps> = () => {
  const dispatch = useAppDispatch()

  const email = useAppSelector(authSlice.selectors.email)
  const handleEmailChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(authSlice.actions.setEmail(event.target.value))
  }, [])

  const password = useAppSelector(authSlice.selectors.password)
  const handlePasswordChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(authSlice.actions.setPassword(event.target.value))
  }, [])

  const formContent = (
    <div className="p-6.5">
      <div className="mb-4.5">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Логин</label>
        <input
          type="text"
          placeholder=""
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={email}
          onChange={handleEmailChange}
        />
      </div>

      <div className="mb-4.5">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">Пароль</label>
        <input
          type="password"
          placeholder=""
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <button className="w-full-30% ml-auto flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
        Вход
      </button>
    </div>
  )

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Вход для админов</h3>
      </div>
      <Suspense fallback={<form action="#">{formContent}</form>}>
        <SignInForm action="#">{formContent}</SignInForm>
      </Suspense>
    </div>
  )
}
