import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'

import { getProfile } from '../../../store/actions'
import { IMAGE_API } from '../../../utils'
import { CLEAR_PLAYER_STATE } from '../../../store/types'

export default function Auth() {
  const [token] = useState(Cookies.get('token') ?? null)

  const { push } = useRouter()

  const dispatch = useDispatch()
  const { getProfileSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )

  useEffect(() => {
    dispatch(getProfile(token!))
  }, [dispatch])

  const handleLogout = () => {
    Cookies.remove('token')
    dispatch({ type: CLEAR_PLAYER_STATE })
    push('/')
  }

  if (getProfileSuccess) {
    return (
      <li className='nav-item my-auto dropdown d-flex'>
        <div className='vertical-line d-lg-block d-none' />
        <div>
          <a
            className='dropdown-toggle ms-lg-40'
            href='#'
            role='button'
            id='dropdownMenuLink'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <img
              src={`${IMAGE_API}/${getProfileSuccess.avatar}`}
              className='rounded-circle'
              width='40'
              height='40'
              alt=''
            />
          </a>

          <ul
            className='dropdown-menu border-0'
            aria-labelledby='dropdownMenuLink'
          >
            <li>
              <Link href='/member'>
                <a className='dropdown-item text-lg color-palette-2'>
                  My Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a className='dropdown-item text-lg color-palette-2' href='#'>
                  Wallet
                </a>
              </Link>
            </li>
            <li>
              <Link href='/member/profile'>
                <a className='dropdown-item text-lg color-palette-2' href='#'>
                  Account Settings
                </a>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <a className='dropdown-item text-lg color-palette-2' href='#'>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </li>
    )
  }

  return (
    <li className='nav-item my-auto'>
      <Link href='/login'>
        <a
          className='btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill'
          role='button'
        >
          Sign In
        </a>
      </Link>
    </li>
  )
}
