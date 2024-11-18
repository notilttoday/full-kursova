import { useCallback } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

export const useTitle = (): [title: string | null, setTitle: (title: string | null) => void] => {
  const searchParams = useSearchParams()

  const router = useRouter()

  const handleTitleChange = useCallback((title: string | null) => {
    const url = new URL(window.location.href)

    if (typeof title === 'string') {
      url.searchParams.set('title', title)
    } else {
      url.searchParams.delete('title')
    }

    router.push(url.toString())
  }, [])

  return [searchParams.get('title'), handleTitleChange]
}
