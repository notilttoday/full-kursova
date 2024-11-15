'use client'

import { Suspense, lazy, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { useGetProductQuery, useUpdateProductMutation } from '@boilerplate/dashboard/store/queries/products.query'

interface UpdateProductFormProps {
  productId: string
}

const UpdateProductBaseForm = lazy(() => import('@boilerplate/dashboard/components/forms/create-product.form/form'))

const gameMap: Record<GameType, string> = {
  [GameType.Dota]: 'Dota 2',
  [GameType.TheWitcher]: 'The Witcher',
  [GameType.WorldOfWarcraft]: 'World of Warcraft',
  [GameType.Diablo]: 'Diablo',
  [GameType.AssassinsCreed]: 'Assassins Creed',
}

export const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ productId }) => {
  const router = useRouter()

  const { data } = useGetProductQuery(productId)
  const [updateProduct] = useUpdateProductMutation()

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    game: GameType.Dota as GameType,
    file: null as File | null,
  })

  useEffect(() => {
    if (data) {
      setFormState({
        title: data.title || '',
        description: data.description || '',
        price: data.price?.toString() || '',
        game: (data.game as GameType) || GameType.Dota,
        file: null,
      })
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0] || null

    setFormState((prevState) => ({
      ...prevState,
      file: selectedFile,
    }))
  }

  const handleSave = async (): Promise<void> => {
    const formData = new FormData()

    formData.append('title', formState.title)
    formData.append('description', formState.description)
    formData.append('price', formState.price)
    formData.append('game', formState.game)
    if (formState.file) {
      formData.append('file', formState.file)
    }

    await updateProduct({ productId, formData }).unwrap()
    alert('Продукт оновлено!')
    router.push('/')
  }

  const content = (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Назва</label>
        <input
          type="text"
          name="title"
          placeholder="Назва фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={formState.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Ціна</label>
        <input
          type="text"
          name="price"
          placeholder="Ціна фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={formState.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Опис</label>
        <textarea
          rows={6}
          placeholder="Опис фігурки"
          name="description"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={formState.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Гра</label>
        <select
          value={formState.game}
          onChange={handleChange}
          name="game"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-black px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          {Object.entries(gameMap).map(([gameType, gameTitle]) => (
            <option key={gameType} value={gameType}>
              {gameTitle}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Завантажити файл</label>
        <input
          type="file"
          name="file"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-end gap-4.5">
        <button
          className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
          onClick={() => router.push('/')}
        >
          Скасувати
        </button>
        <button
          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
          type="submit"
          onClick={handleSave}
        >
          Зберегти
        </button>
      </div>
    </>
  )

  return (
    <div className="rounded-lg rounded-sm border border-[1px] border-stroke bg-black shadow-default dark:border-strokedark dark:bg-boxdark">
      <Suspense fallback={<form className="flex flex-col gap-5.5 p-6.5">{content}</form>}>
        <UpdateProductBaseForm className="flex flex-col gap-5.5 p-6.5">{content}</UpdateProductBaseForm>
      </Suspense>
    </div>
  )
}
