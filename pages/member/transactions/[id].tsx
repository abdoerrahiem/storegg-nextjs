import React from 'react'
import ContentHead from '../../../components/atoms/ContentHead'
import TransactionDetailsContent from '../../../components/organisms/TransactionDetailsContent'
import store from '../../../store'
import { getMemberTransactionDetails, getProfile } from '../../../store/actions'

export default function TransactionDetailsPage() {
  return (
    <>
      <ContentHead title='Detail Transaksi' />
      <section className='transactions-detail overflow-auto'>
        <TransactionDetailsContent />
      </section>
    </>
  )
}

export const getServerSideProps = store.getServerSideProps(
  ({ dispatch, getState }) => async ({ req, params }): Promise<any> => {
    const token = req.cookies.token

    if (token) {
      await dispatch(getProfile(token))
      await dispatch(getMemberTransactionDetails(params!.id as string, token))

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
