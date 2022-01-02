import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'

export default function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { push } = useRouter()

  const handleSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault()

    if (!name || !email || !password)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data not complete',
      })

    Cookie.set('name', name)
    Cookie.set('email', email)
    Cookie.set('password', password)

    push('/register-photo')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='pb-50'>
        <Link href='/'>
          <a className='navbar-brand'>
            <Image src='/icon/logo.svg' width={60} height={60} alt='logo' />
          </a>
        </Link>
      </div>
      <h2 className='text-4xl fw-bold color-palette-1 mb-10'>Sign Up</h2>
      <p className='text-lg color-palette-1 m-0'>
        Daftar dan bergabung dengan kami
      </p>
      <div className='pt-50'>
        <label
          htmlFor='name'
          className='form-label text-lg fw-medium color-palette-1 mb-10'
        >
          Full Name
        </label>
        <input
          type='text'
          className='form-control rounded-pill text-lg'
          id='name'
          name='name'
          aria-describedby='name'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='pt-30'>
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
          type='submit'
          className='btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16'
        >
          Continue
        </button>
        <Link href='/login'>
          <a
            className='btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill'
            role='button'
          >
            Sign In
          </a>
        </Link>
      </div>
    </form>
  )
}
