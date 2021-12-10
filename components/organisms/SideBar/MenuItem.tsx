import Image from 'next/image'
import Link from 'next/link'

interface MenuItemProps {
  title: string
  icon:
    | 'ic-menu-overview'
    | 'ic-menu-transaction'
    | 'ic-menu-card'
    | 'ic-menu-logout'
    | 'ic-menu-messages'
    | 'ic-menu-reward'
    | 'ic-menu-setting'
  active?: boolean
  href?: string
  //   onClick?: () => void
}

export default function MenuItem({
  title,
  icon,
  active,
  href,
}: Partial<MenuItemProps>) {
  return (
    <div className={`item mb-30 ${active ? 'active' : ''}`}>
      <div className='me-3'>
        <Image src={`/icon/${icon}.svg`} width={25} height={25} />
      </div>
      <p className='item-title m-0'>
        <a href={href} className='text-lg text-decoration-none'>
          {title}
        </a>
      </p>
    </div>
  )
}
