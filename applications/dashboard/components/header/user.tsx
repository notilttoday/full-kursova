import Image from 'next/image'

import noAvatarImage from '@boilerplate/dashboard/assets/images/no-avatar.png'

import { useGetProfileQuery } from '@boilerplate/dashboard/store/queries/profile.query'

interface HeaderUserProps {}

export const HeaderUser: React.FC<HeaderUserProps> = () => {
  const { data: profile, isSuccess } = useGetProfileQuery()

  if (!isSuccess) {
    return null
  }

  const { firstName, lastName } = profile

  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-right lg:block">
        <span className="block text-sm font-medium text-black dark:text-white">
          {firstName} {lastName}
        </span>
      </span>

      <span className="h-12 w-12 rounded-full">
        <Image
          width={112}
          height={112}
          src={noAvatarImage}
          style={{
            width: 'auto',
            height: 'auto',
          }}
          alt="User"
        />
      </span>
    </div>
  )
}
