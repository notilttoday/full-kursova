/* eslint-disable import/no-default-export */
'use client'

import 'reset.css'
import '@boilerplate/front-end/app/reset.scss'
import { useEffect, useState } from 'react'

import { Benefits } from '@boilerplate/front-end/components/benefits-container'
import { ProductsList } from '@boilerplate/front-end/components/products-list'

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [queryParams, setQueryParams] = useState<{
    title?: string
    game?: string[]
  }>({})

  console.log(queryParams)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const title = params.get('title') ?? undefined
    const game = params.get('game')?.split(',') ?? undefined

    setQueryParams({
      title,
      game,
    })
  }, [])

  return (
    <>
      <Benefits />
      <ProductsList {...queryParams} />
    </>
  )
}

export default HomePage
