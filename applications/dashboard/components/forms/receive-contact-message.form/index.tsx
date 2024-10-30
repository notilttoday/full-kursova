'use client'

import classes from '@boilerplate/front-end/components/products-list/style.module.scss'

import { ContactMessageItem } from '@boilerplate/dashboard/components/forms/receive-contact-message.form/contact-message-item'

import { useReceiveQuery } from '@boilerplate/dashboard/store/queries/contact-messages.query'

interface ReceiveContactMessagePageProps { }

export const ReceiveContactMessagePage: React.FC<ReceiveContactMessagePageProps> = () => {
  const { data = [] } = useReceiveQuery()

  return (
    <div className="col-span-12 xl:col-span-7 h-screen flex flex-col">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 h-[calc(100vh-220px)]">
        <div className="mb-6 flex justify-center">
          <h4 className="text-title-sm2 font-bold text-black dark:text-white">
            Повідомлення користувачів
          </h4>
        </div>

        <div className="flex flex-col overflow-auto h-[calc(100vh-320px)]">
          <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
            <div className="p-2.5 xl:p-4 flex items-center justify-start">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Дані користувача
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4 flex items-center justify-start">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Звернення
              </h5>
            </div>
          </div>

          {data.map(({ firstName, lastName, email, phone, message, userId }, index) => (
            <div
              key={userId || index}
              className="grid grid-cols-2 rounded-lg bg-white dark:bg-boxdark p-4 mb-4 shadow-md border border-black"
            >
              <div className="flex flex-col items-start justify-center">
                <p><strong>Name:</strong> {firstName} {lastName}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>User ID:</strong> {userId}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="break-words overflow-hidden whitespace-wrap text-ellipsis" style={{ height: '150px', maxHeight: '200px' }}>
                  {message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}