import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux'

import { login } from '../../../store/actions'
import Spinner from '../../atoms/Spinner'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { push, query } = useRouter()

  const dispatch = useDispatch()
  const { loginLoading, loginFail } = useSelector(
    (state: RootStateOrAny) => state.authReducer
  )
  const { getProfileSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )

  useEffect(() => {
    if (loginFail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: loginFail,
      })
    }

    if (getProfileSuccess) {
      if (query.page) {
        push(`${query.page}`)
      } else {
        push('/')
      }
    }
  }, [loginFail, getProfileSuccess, query.page])

  const handleSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault()

    if (!email || !password)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data not complete',
      })

    dispatch(login({ email, password }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='container mx-auto'>
        <div className='pb-50'>
          <Link href='/'>
            <a className='navbar-brand'>
              <Image src='/icon/logo.svg' width={60} height={60} alt='logo' />
            </a>
          </Link>
        </div>
        <h2 className='text-4xl fw-bold color-palette-1 mb-10'>Sign In</h2>
        <p className='text-lg color-palette-1 m-0'>
          Masuk untuk melakukan proses top up
        </p>
        <div className='pt-50'>
          <label
            htmlFor='email'
            className='form-label text-lg fw-medium color-palette-1 mb-10'
          >
            Email Address
          </label>
          <input
            type='email'
            className='form-control rounded-pill text-lg'
            id='email'
            name='email'
            aria-describedby='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='pt-30'>
          <label
            htmlFor='password'
            className='form-label text-lg fw-medium color-palette-1 mb-10'
          >
            Password
          </label>
          <input
            type='password'
            className='form-control rounded-pill text-lg'
            id='password'
            name='password'
            aria-describedby='password'
            placeholder='Your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='button-group d-flex flex-column mx-auto pt-50'>
          <button
            className='btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16'
            type='submit'
            disabled={loginLoading}
          >
            {loginLoading ? <Spinner /> : 'Continue to Sign In'}
          </button>

          <Link href='/register'>
            <a
              className='btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill'
              role='button'
            >
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    </form>
  )
}
