import Link from 'next/link'

interface MenuProps {
  title: string
  active?: boolean
  href: string
}

export default function Menu({
  title,
  active,
  href = '/',
}: Partial<MenuProps>) {
  return (
    <li className='nav-item my-auto'>
      <Link href={href}>
        <a className={active ? 'nav-link active' : 'nav-link'}>{title}</a>
      </Link>
    </li>
  )
}
