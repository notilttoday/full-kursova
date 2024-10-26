import Link from 'next/link'

interface SidebarLinkItemProps {
  icon: React.ReactNode

  href: string
  onClick?: undefined

  isActive?: boolean

  children: React.ReactNode
}

export interface SidebarButtonItemProps {
  icon: React.ReactNode

  href?: undefined
  onClick: () => void | Promise<void>

  isActive?: boolean

  children: React.ReactNode
}

export const SidebarItem: React.FC<SidebarLinkItemProps | SidebarButtonItemProps> = ({
  icon,
  href,
  onClick: handleClick,
  isActive,
  children,
}) => (
  <>
    <li>
      {typeof href === 'string' ? (
        <Link
          href={href}
          className={`${isActive ? 'bg-graydark dark:bg-meta-4' : ''} group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
        >
          {icon}
          {children}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={`${isActive ? 'bg-graydark dark:bg-meta-4' : ''} group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
        >
          {icon}
          {children}
        </button>
      )}
    </li>
  </>
)
