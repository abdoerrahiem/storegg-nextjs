import Image from 'next/image'
import CheckoutItem from '../components/organisms/CheckoutItem'
import CheckoutDetails from '../components/organisms/CheckoutDetails'
import CheckoutConfirm from '../components/organisms/CheckoutConfirm'
import store from '../store'
import { getProfile } from '../store/actions'
import ContentHead from '../components/atoms/ContentHead'
// import { RootStateOrAny, useSelector } from 'react-redux'

export default function CheckoutPage() {
  return (
    <>
      <ContentHead title='Checkout' />
      <section className='checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30'>
        <div className='container-fluid'>
          <div className='logo text-md-center text-start pb-50'>
            <a className='' href='/'>
              <Image src='/icon/logo.svg' width={60} height={60} alt='logo' />
            </a>
          </div>
          <div className='title-text pt-md-50 pt-0'>
            <h2 className='text-4xl fw-bold color-palette-1 mb-10'>Checkout</h2>
            <p className='text-lg color-palette-1 mb-0'>
              Waktunya meningkatkan cara bermain
            </p>
          </div>
          <CheckoutItem />
          <hr />
          <CheckoutDetails />
          <CheckoutConfirm />
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

      if (!getProfileSuccess) {
        return {
          redirect: {
            destination: '/login?page=checkout',
            permanent: false,
          },
        }
      }
    } else {
      return {
        redirect: {
          destination: '/login?page=checkout',
          permanent: false,
        },
      }
    }
  }
)
