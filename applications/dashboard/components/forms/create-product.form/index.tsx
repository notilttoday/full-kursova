'use client'

import { createProductSlice } from "@/store/slices/create-product.slice"
import { useAppDispatch, useAppSelector } from "@boilerplate/dashboard/store"
import { GameType } from "@boilerplate/types/products/interfaces/products"
import { lazy, useCallback, Suspense, useState } from "react"

interface CreateProductFormProps { }

const CreateProductBaseForm = lazy(() => import('@boilerplate/dashboard/components/forms/create-product.form/form'))

export const CreateProductForm: React.FC<CreateProductFormProps> = () => {
  const dispatch = useAppDispatch()

  const title = useAppSelector(createProductSlice.selectors.title)
  const handleChangeTitle = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(createProductSlice.actions.setTitle(event.target.value))
  }, [])

  const description = useAppSelector(createProductSlice.selectors.description)
  const handleChangeDescription = useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>((event) => {
    dispatch(createProductSlice.actions.setDescription(event.target.value))
  }, [])

  const price = useAppSelector(createProductSlice.selectors.price)
  const handleChangePrice = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    dispatch(createProductSlice.actions.setPrice(parseFloat(event.target.value)))
  }, [])

  const game = useAppSelector(createProductSlice.selectors.game);
  const handleChangeGame = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((event) => {
    dispatch(createProductSlice.actions.setGame(event.target.value));
  }, []);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const selectedFile = event.target.files?.[0] || null;
    dispatch(createProductSlice.actions.setFile(selectedFile));
  }, []);

  const content = (
    <>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">
          Назва
        </label>
        <input
          type="text"
          placeholder="Назва фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">
          Ціна
        </label>
        <input
          type="text"
          placeholder="Ціна фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={price}
          onChange={handleChangePrice}
        />
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">
          Опис
        </label>
        <textarea
          rows={6}
          placeholder="Опис фігурки"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          value={description}
          onChange={handleChangeDescription}
        ></textarea>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">
          Гра
        </label>
        <select
          value={game}
          onChange={handleChangeGame}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-black px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          {Object.values(GameType).map((gameValue) => (
            <option key={gameValue} value={gameValue}>
              {gameValue}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-3 block text-sm font-medium text-white dark:text-white">
          Завантажити файл
        </label>
        <input
          type="file"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-white outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex justify-end gap-4.5">
        <button
          className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
          type="submit"
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
    <div className="rounded-sm border rounded-lg border-[1px] border-stroke bg-black shadow-default dark:border-strokedark dark:bg-boxdark">
      <Suspense fallback={(
        <form className="flex flex-col gap-5.5 p-6.5">
          {content}
        </form>
      )}>
        <CreateProductBaseForm className="flex flex-col gap-5.5 p-6.5">
          {content}
        </CreateProductBaseForm>
      </Suspense>
    </div>
  )
}