import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: 'text' | 'email' | 'password'
}

export default function Input({ label, type, ...nativeProps }: InputProps) {
  return (
    <>
      <label
        htmlFor='name'
        className='form-label text-lg fw-medium color-palette-1 mb-10'
      >
        {label}
      </label>
      <input
        type={type}
        className='form-control rounded-pill text-lg'
        placeholder={label}
        {...nativeProps}
      />
    </>
  )
}
