import Cookies from 'js-cookie'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import Swal from 'sweetalert2'
import ContentHead from '../../components/atoms/ContentHead'

import Input from '../../components/atoms/Input'
import Spinner from '../../components/atoms/Spinner'
import SideBar from '../../components/organisms/SideBar'
import store from '../../store'
import { getProfile, updateProfile } from '../../store/actions'
import { CLEAR_MEMBER_STATE } from '../../store/types'
import { IMAGE_API } from '../../utils'

interface UserStateTypes {
  id: string
  name: string
  email: string
  avatar: any
  phoneNumber: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserStateTypes>({
    id: '',
    name: '',
    email: '',
    avatar: '',
    phoneNumber: '',
  })
  const [imagePreview, setImagePreview] = useState('')

  const dispatch = useDispatch()
  const { getProfileSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )
  const {
    updateProfileSuccess,
    updateProfileFail,
    updateProfileLoading,
  } = useSelector((state: RootStateOrAny) => state.memberReducer)

  useEffect(() => {
    if (getProfileSuccess) {
      setUser({
        id: getProfileSuccess.id,
        name: getProfileSuccess.name,
        email: getProfileSuccess.email,
        avatar: getProfileSuccess.avatar,
        phoneNumber: getProfileSuccess.phoneNumber ?? '',
      })
    }

    if (updateProfileFail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: updateProfileFail,
      })
    }

    if (updateProfileSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Congratulations!',
        text: 'Profil kamu berhasil diperbaharui',
        timer: 3000,
      })
      dispatch(getProfile(Cookies.get('token')!))
      dispatch({ type: CLEAR_MEMBER_STATE })
    }
  }, [getProfileSuccess, updateProfileFail, updateProfileSuccess])

  const handleSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault()

    const data = new FormData()
    data.append('image', user.avatar)
    data.append('name', user.name)
    data.append('email', user.email)
    data.append('phoneNumber', user.phoneNumber)

    dispatch(updateProfile(data, Cookies.get('token')!))
  }

  return (
    <>
      <ContentHead title='Update Profile' />
      <section className='edit-profile overflow-auto'>
        <SideBar />
        <main className='main-wrapper'>
          <div className='ps-lg-0'>
            <h2 className='text-4xl fw-bold color-palette-1 mb-30'>Settings</h2>
            <div className='bg-card pt-30 ps-30 pe-30 pb-30'>
              <form onSubmit={handleSubmit}>
                <div className='photo d-flex'>
                  {/* <div className='position-relative me-20'>
                  <img
                    src='/img/avatar-1.png'
                    width='90'
                    height='90'
                    className='avatar img-fluid'
                  />
                  <div className='avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center'>
                    <img
                      src='/icon/upload.svg'
                      alt='icon upload'
                      width={90}
                      height={90}
                    />
                  </div>
                </div> */}
                  <div className='image-upload'>
                    <label htmlFor='avatar'>
                      {imagePreview === '' ? (
                        <img
                          src={`${IMAGE_API}/${user.avatar}`}
                          alt='icon upload'
                          width={90}
                          height={90}
                          style={{ borderRadius: '100%' }}
                        />
                      ) : (
                        <img
                          src={imagePreview}
                          alt='icon upload'
                          width={90}
                          height={90}
                          style={{ borderRadius: '100%' }}
                        />
                      )}
                    </label>
                    <input
                      id='avatar'
                      type='file'
                      name='avatar'
                      accept='image/png, image/jpeg'
                      onChange={(event) => {
                        const img = event.target.files![0]
                        setImagePreview(URL.createObjectURL(img))
                        return setUser({
                          ...user,
                          avatar: img,
                        })
                      }}
                    />
                  </div>
                </div>
                <div className='pt-30'>
                  <Input
                    label='Full Name'
                    type='text'
                    value={user.name}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        name: event.target.value,
                      })
                    }
                  />
                </div>
                <div className='pt-30'>
                  <Input
                    label='Email Address'
                    type='email'
                    value={user.email}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        email: event.target.value,
                      })
                    }
                  />
                </div>
                <div className='pt-30'>
                  <Input
                    label='Phone'
                    type='text'
                    value={user.phoneNumber}
                    onChange={(event) =>
                      setUser({
                        ...user,
                        phoneNumber: event.target.value,
                      })
                    }
                  />
                </div>
                <div className='button-group d-flex flex-column pt-50'>
                  <button
                    type='submit'
                    className='btn btn-save fw-medium text-lg text-white rounded-pill'
                    role='button'
                  >
                    {updateProfileLoading ? <Spinner /> : 'Save My Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export const getServerSideProps = store.getServerSideProps(
  ({ dispatch, getState }) => async ({ req }): Promise<any> => {
    const token = req.cookies.token

    if (token) {
      await dispatch(getProfile(token))

      const { getProfileSuccess } = getState().playerReducer

      if (!getProfileSuccess) {
        return {
          redirect: {
            destination: '/login?page=member/profile',
            permanent: false,
          },
        }
      }
    } else {
      return {
        redirect: {
          destination: '/login?page=member/profile',
          permanent: false,
        },
      }
    }
  }
)
