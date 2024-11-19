'use client'

import { Suspense, lazy, useCallback, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { GameType } from '@boilerplate/types/products/interfaces/products'

import { useAppDispatch, useAppSelector } from '@boilerplate/dashboard/store'

import { useGetProductQuery } from '@boilerplate/dashboard/store/queries/product.query'
import { updateProductSlice } from '@boilerplate/dashboard/store/slices/update-product.slice'

interface UpdateProductFormProps {
  productId: string
}

const UpdateProductBaseForm = lazy(() => import('@boilerplate/dashboard/components/forms/update-product.form/form'))

const gameMap: Record<GameType, string> = {
  [GameType.Dota]: 'Dota 2',
  [GameType.TheWitcher]: 'The Witcher',
  [GameType.WorldOfWarcraft]: 'World of Warcraft',
  [GameType.Diablo]: 'Diablo',
  [GameType.AssassinsCreed]: 'Assassins Creed',
}

export const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ productId }) => {
  const router = useRouter()

  const { data: product } = useGetProductQuery(productId)
  const dispatch = useAppDispatch()

  // const [formState, setFormState] = useState({
  //   title: '',
  //   description: '',
  //   price: '',
  //   game: GameType.Dota as GameType,
  //   file: null as File | null,
  // })

  // useEffect(() => {
  //   if (data) {
  //     setFormState({
  //       title: data.title || '',
  //       description: data.description || '',
  //       price: data.price?.toString() || '',
  //       game: (data.game as GameType) || GameType.Dota,
  //       file: null,
  //     })
  //   }
  // }, [data])

  useEffect(() => {
    if (product) {
      dispatch(updateProductSlice.actions.setProductId(product.id))
      dispatch(updateProductSlice.actions.setTitle(product.title))
      dispatch(updateProductSlice.actions.setDescription(product.description))
      dispatch(updateProductSlice.actions.setPrice(product.price))
      dispatch(updateProductSlice.actions.setGame(product.game))
    }
  }, [product, dispatch])

  const title = useAppSelector(updateProductSlice.selectors.title)
  const handleTitleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      dispatch(updateProductSlice.actions.setTitle(event.target.value))
    },
    [dispatch],
  )

  const description = useAppSelector(updateProductSlice.selectors.description)
  const handleChangeDescription = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    dispatch(updateProductSlice.actions.setDescription(event.target.value))
  }, [])

  const price = useAppSelector(updateProductSlice.selectors.price)
  const handleChangePrice = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(updateProductSlice.actions.setPrice(parseFloat(event.target.value)))
  }, [])

  const game = useAppSelector(updateProductSlice.selectors.game)
  const handleChangeGame = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    dispatch(updateProductSlice.actions.setGame(event.target.value as GameType))
  }, [])

  const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const selectedFile = event.target.files?.[0] || null

    dispatch(updateProductSlice.actions.setFile(selectedFile))
  }, [])

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
  //   const { name, value } = e.target

  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }))
  // }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const selectedFile = e.target.files?.[0] || null

  //   setFormState((prevState) => ({
  //     ...prevState,
  //     file: selectedFile,
  //   }))
  // }

  // const handleSave = async (): Promise<void> => {
  //   const formData = new FormData()

  //   formData.append('title', formState.title)
  //   formData.append('description', formState.description)
  //   formData.append('price', formState.price)
  //   formData.append('game', formState.game)
  //   if (formState.file) {
  //     formData.append('file', formState.file)
  //   }

  //   await updateProduct({ productId, formData }).unwrap()
  //   router.push('/')
  // }

  const content = (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Назва</label>
        <input
          type="text"
          name="title"
          placeholder="Назва фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          onChange={handleTitleChange}
          value={title}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Ціна</label>
        <input
          type="text"
          name="price"
          placeholder="Ціна фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          onChange={handleChangePrice}
          value={price}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Опис</label>
        <textarea
          onChange={handleChangeDescription}
          value={description}
          rows={6}
          placeholder="Опис фігурки"
          name="description"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        ></textarea>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">Гра</label>
        <select
          onChange={handleChangeGame}
          value={game}
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
          onChange={handleFileChange}
          type="file"
          name="file"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
