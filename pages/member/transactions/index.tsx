import ContentHead from '../../../components/atoms/ContentHead'
import SideBar from '../../../components/organisms/SideBar'
import TransactionContent from '../../../components/organisms/TransactionContent'
import store from '../../../store'
import { getMemberTransactions, getProfile } from '../../../store/actions'

export default function TransactionsPage() {
  return (
    <>
      <ContentHead title='Transaksi' />
      <section className='transactions overflow-auto'>
        <SideBar />
        <TransactionContent />
      </section>
    </>
  )
}

export const getServerSideProps = store.getServerSideProps(
  ({ dispatch, getState }) => async ({ req }): Promise<any> => {
    const token = req.cookies.token

    if (token) {
      await dispatch(getProfile(token))
      await dispatch(getMemberTransactions('all', token))

      const { getProfileSuccess } = getState().playerReducer

      if (!getProfileSuccess) {
        return {
          redirect: {
            destination: '/login?page=member/transactions',
            permanent: false,
          },
        }
      }
    } else {
      return {
        redirect: {
          destination: '/login?page=member/transactions',
          permanent: false,
        },
      }
    }
  }
)
