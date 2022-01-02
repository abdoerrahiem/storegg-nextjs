import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import Footer from './Footer'
import MenuItem from './MenuItem'
import Profile from './Profile'

export default function SideBar() {
  const { pathname } = useRouter()

  return (
    <section className='sidebar'>
      <div className='content pt-50 pb-30 ps-30'>
        <Profile />
        <div className='menus'>
          <MenuItem
            title='Overview'
            icon='ic-menu-overview'
            href='/member'
            active={pathname === '/member'}
          />
          <MenuItem
            title='Transactions'
            icon='ic-menu-overview'
            href='/member/transactions'
            active={pathname === '/member/transactions'}
          />
          <MenuItem
            title='Messages'
            icon='ic-menu-messages'
            href='/member/messages'
            active={pathname === '/member/messages'}
          />
          <MenuItem
            title='Card'
            icon='ic-menu-card'
            href='/member/card'
            active={pathname === '/member/card'}
          />
          <MenuItem
            title='Rewards'
            icon='ic-menu-reward'
            href='/member/rewards'
            active={pathname === '/member/reward'}
          />
          <MenuItem
            title='Settings'
            icon='ic-menu-setting'
            href='/member/profile'
            active={pathname === '/member/profile'}
          />
          <MenuItem
            title='Logout'
            icon='ic-menu-logout'
            href='/login'
            onClick={() => Cookies.remove('token')}
          />
        </div>
        <Footer />
      </div>
    </section>
  )
}
