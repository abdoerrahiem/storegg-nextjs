import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Cookie from 'js-cookie'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

import { getGameCategories, register } from '../store/actions'
import { CategoryTypes } from '../utils'
import Spinner from '../components/atoms/Spinner'
import { CLEAR_AUTH_STATE } from '../store/types'
import ContentHead from '../components/atoms/ContentHead'

export default function RegisterPhotoPage() {
  const [favorite, setFavorite] = useState('')
  const [image, setImage] = useState<any>('')
  const [imagePreview, setImagePreview] = useState<any>(null)
  const [localForm, setLocalForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { push } = useRouter()

  const dispatch = useDispatch()
  const { getGameCategoriesSuccess, getProfileSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )
  const { registerFail, registerLoading } = useSelector(
    (state: RootStateOrAny) => state.authReducer
  )

  useEffect(() => {
    dispatch(getGameCategories())
    setLocalForm({
      name: Cookie.get('name')!,
      email: Cookie.get('email')!,
      password: Cookie.get('password')!,
    })
  }, [])

  useEffect(() => {
    if (registerFail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: registerFail,
        timer: 3000,
      })

      setTimeout(() => dispatch({ type: CLEAR_AUTH_STATE }), 3000)
    }

    if (getProfileSuccess) {
      push('/')

      Cookie.remove('name')
      Cookie.remove('email')
      Cookie.remove('password')
    }
  }, [registerFail, getProfileSuccess])

  const handlePhoto = (e: ChangeEvent<any>) => {
    const img = e.target.files![0]
    setImagePreview(URL.createObjectURL(img))
    setImage(img)
  }

  const handleSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault()

    if (!favorite)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select the favorite game',
      })

    const data = new FormData()
    data.append('image', image)
    data.append('email', localForm.email)
    data.append('name', localForm.name)
    data.append('password', localForm.password)
    data.append('favorite', favorite)

    dispatch(register(data))
  }

  return (
    <>
      <ContentHead title='Upload Photo' />
      <section className='sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50'>
        <div className='container mx-auto'>
          <form onSubmit={handleSubmit}>
            <div className='form-input d-md-block d-flex flex-column'>
              <div>
                <div className='mb-20'>
                  <div className='image-upload text-center'>
                    <label htmlFor='avatar'>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          className='img-upload'
                          alt='upload'
                        />
                      ) : (
                        <Image
                          src='/icon/upload.svg'
                          width={120}
                          height={120}
                          alt='upload'
                        />
                      )}
                    </label>
                    <input
                      id='avatar'
                      type='file'
                      name='avatar'
                      accept='image/png, image/jpeg'
                      onChange={handlePhoto}
                    />
                  </div>
                </div>
                <h2 className='fw-bold text-xl text-center color-palette-1 m-0'>
                  {localForm.name}
                </h2>
                <p className='text-lg text-center color-palette-1 m-0'>
                  {localForm.email}
                </p>
                <div className='pt-50 pb-50'>
                  <label
                    htmlFor='category'
                    className='form-label text-lg fw-medium color-palette-1 mb-10'
                  >
                    Favorite Game
                  </label>
                  <select
                    id='category'
                    name='category'
                    className='form-select d-block w-100 rounded-pill text-lg'
                    aria-label='Favorite Game'
                    value={favorite}
                    onChange={(e) => setFavorite(e.target.value)}
                  >
                    <option value='' disabled selected>
                      Select Category
                    </option>
                    {getGameCategoriesSuccess?.map((ctg: CategoryTypes) => (
                      <option key={ctg._id} value={ctg._id}>
                        {ctg.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='button-group d-flex flex-column mx-auto'>
                <button
                  type='submit'
                  className='btn btn-create fw-medium text-lg text-white rounded-pill mb-16'
                >
                  {registerLoading ? <Spinner /> : 'Create My Account'}
                </button>
                <a
                  className='btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15'
                  href='#'
                  role='button'
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
