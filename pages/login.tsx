import ContentHead from '../components/atoms/ContentHead'
import LoginForm from '../components/organisms/LoginForm'
import store from '../store'
import { getProfile } from '../store/actions'

export default function LoginPage() {
  return (
    <>
      <ContentHead title='Login' />
      <section className='sign-in mx-auto'>
        <div className='row'>
          <div className='col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0'>
            <LoginForm />
          </div>
          <div className='col-xxl-7 col-lg-6 bg-blue text-center pt-lg-145 pb-lg-145 d-lg-block d-none'>
            <img
              src='/img/Header-9.png'
              width='502'
              height='391.21'
              className='img-fluid pb-50'
              alt=''
            />
            <h2 className='text-4xl fw-bold text-white mb-30'>
              Win the battle.
              <br />
              Be the Champion.
            </h2>
            <p className='text-white m-0'>
              Kami menyediakan jutaan cara untuk
              <br /> membantu players menjadi
              <br />
              pemenang sejati
            </p>
          </div>
        </div>
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

      if (getProfileSuccess) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }
  }
)
