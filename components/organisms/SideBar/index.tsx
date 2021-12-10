import Footer from './Footer'
import MenuItem from './MenuItem'
import Profile from './Profile'

export default function SideBar() {
  return (
    <section className='sidebar'>
      <div className='content pt-50 pb-30 ps-30'>
        <Profile />
        <div className='menus'>
          <MenuItem
            title='Overview'
            icon='ic-menu-overview'
            active
            href='/member'
          />
          <MenuItem
            title='Transactions'
            icon='ic-menu-overview'
            href='/member/transactions'
          />
          <MenuItem title='Messages' icon='ic-menu-messages' href='/member' />
          <MenuItem title='Card' icon='ic-menu-card' href='/member' />
          <MenuItem title='Rewards' icon='ic-menu-reward' href='/member' />
          <MenuItem
            title='Settings'
            icon='ic-menu-setting'
            href='/member/profile'
          />
          <MenuItem title='Logout' icon='ic-menu-logout' href='/login' />
        </div>
        <Footer />
      </div>
    </section>
  )
}
