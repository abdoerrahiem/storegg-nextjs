import { useSelector, RootStateOrAny } from 'react-redux'

import TopUpForm from '../../components/molecules/TopUpForm'
import Footer from '../../components/organisms/Footer'
import Navbar from '../../components/organisms/Navbar'
import TopUpItem from '../../components/organisms/TopUpItem'
import { getDetailsVoucher, getPayments } from '../../store/actions'
import store from '../../store'
import ContentHead from '../../components/atoms/ContentHead'

export default function DetailsPage() {
  const { getDetailsVoucherSuccess, getPaymentsSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )

  return (
    <>
      <ContentHead title={getDetailsVoucherSuccess.name} />
      <Navbar />

      <section className='detail pt-lg-60 pb-50'>
        <div className='container-xxl container-fluid'>
          <div className='detail-header pb-50'>
            <h2 className='text-4xl fw-bold color-palette-1 text-start mb-10'>
              Top Up
            </h2>
            <p className='text-lg color-palette-1 mb-0'>
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className='row'>
            <div className='col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start'>
              <TopUpItem type='mobile' data={getDetailsVoucherSuccess} />
            </div>
            <div className='col-xl-9 col-lg-8 col-md-7 ps-md-25'>
              <TopUpItem type='desktop' data={getDetailsVoucherSuccess} />
              <hr />
              <TopUpForm
                nominals={getDetailsVoucherSuccess.nominals}
                payments={getPaymentsSuccess}
                data={getDetailsVoucherSuccess}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export const getServerSideProps = store.getServerSideProps(
  ({ dispatch }) => async ({ params }: any): Promise<any> => {
    await dispatch(getDetailsVoucher(params.id))
    await dispatch(getPayments())
  }
)
