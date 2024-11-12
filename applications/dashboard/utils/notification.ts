import { enqueueSnackbar } from 'notistack'

interface Options {
  key?: string
  persist?: boolean
}

export const notification = {
  error(message: string | React.ReactNode, options: Options = {}): void {
    enqueueSnackbar(message, { variant: 'error', ...options })
  },

  warning(message: string | React.ReactNode, options: Options = {}): void {
    enqueueSnackbar(message, { variant: 'warning', ...options })
  },

  success(message: string | React.ReactNode, options: Options = {}): void {
    enqueueSnackbar(message, { variant: 'success', ...options })
  },

  info(message: string | React.ReactNode, options: Options = {}): void {
    enqueueSnackbar(message, { variant: 'info', ...options })
  },

  default(message: string | React.ReactNode, options: Options = {}): void {
    enqueueSnackbar(message, { variant: 'default', ...options })
  },
}
