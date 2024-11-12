import Avatar from 'react-avatar'

import { useGetProfileQuery } from '@boilerplate/dashboard/store/queries/profile.query'

interface HeaderUserProps {}

export const HeaderUser: React.FC<HeaderUserProps> = () => {
  const { data: profile, isSuccess } = useGetProfileQuery()

  const { firstName, lastName } = profile || {}

  return (
    <div className="flex items-center gap-4">
      <span className="hidden text-right lg:block">
        <span className="block text-base font-medium text-black dark:text-white">
          {isSuccess ? firstName : null} {isSuccess ? lastName : null}
        </span>
      </span>

      <span className="align-center flex h-12 w-12 justify-center overflow-hidden rounded-full">
        <Avatar name={`${firstName} ${lastName}`} size="48" color="#3c50e0" textSizeRatio={2.5} />
      </span>
    </div>
  )
}
