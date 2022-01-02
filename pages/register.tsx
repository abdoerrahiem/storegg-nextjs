import ContentHead from '../components/atoms/ContentHead'
import RegisterForm from '../components/organisms/RegisterForm'
import store from '../store'
import { getProfile } from '../store/actions'

export default function RegisterPage() {
  return (
    <>
      <ContentHead title='Register' />
      <section className='sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47'>
        <div className='container mx-auto'>
          <RegisterForm />
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
