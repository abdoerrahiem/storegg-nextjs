import { useSelector, RootStateOrAny } from 'react-redux'
import { IMAGE_API } from '../../../utils'
import Row from './Row'

export default function TransactionDetailsContent() {
  const { getTransactionDetailsSuccess } = useSelector(
    (state: RootStateOrAny) => state.memberReducer
  )

  console.log(getTransactionDetailsSuccess)

  return (
    <main className='main-wrapper'>
      <div className='ps-lg-0'>
        <h2 className='text-4xl fw-bold color-palette-1 mb-30'>
          Details #{getTransactionDetailsSuccess._id}
        </h2>
        <div className='details'>
          <div className='main-content main-content-card overflow-auto'>
            <section className='checkout mx-auto'>
              <div className='d-flex flex-row  align-items-center justify-content-between mb-30'>
                <div className='game-checkout d-flex flex-row align-items-center'>
                  <div className='pe-4'>
                    <div className='cropped'>
                      <img
                        src={`${IMAGE_API}/${getTransactionDetailsSuccess.historyVoucherTopup.thumbnail}`}
                        width='200'
                        height='130'
                        className='img-fluid'
                        alt=''
                      />
                    </div>
                  </div>
                  <div>
                    <p className='fw-bold text-xl color-palette-1 mb-10'>
                      {
                        getTransactionDetailsSuccess.historyVoucherTopup
                          .gameName
                      }
                    </p>
                    <p className='color-palette-2 m-0'>
                      Category:{' '}
                      {
                        getTransactionDetailsSuccess.historyVoucherTopup
                          .category
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <p className='fw-medium text-center label pending m-0 rounded-pill'>
                    {getTransactionDetailsSuccess.status}
                  </p>
                </div>
              </div>
              <hr />
              <div className='purchase pt-30'>
                <h2 className='fw-bold text-xl color-palette-1 mb-20'>
                  Purchase Details
                </h2>
                <Row
                  label='Your Game ID'
                  value={getTransactionDetailsSuccess.accountUser}
                />
                <Row
                  label='Order ID'
                  value={getTransactionDetailsSuccess._id}
                />
                <Row
                  label='Item'
                  value={`${getTransactionDetailsSuccess.historyVoucherTopup.coinQuantity} ${getTransactionDetailsSuccess.historyVoucherTopup.coinName}`}
                />
                <Row
                  label='Price'
                  value={getTransactionDetailsSuccess.historyVoucherTopup.price}
                />
                <Row label='Tax 10%' value={getTransactionDetailsSuccess.tax} />
                <Row
                  label='Total'
                  value={getTransactionDetailsSuccess.value}
                  className='color-palette-4'
                />
              </div>
              <div className='payment pt-10 pb-10'>
                <h2 className='fw-bold text-xl color-palette-1 mb-20'>
                  Payment Informations
                </h2>
                <Row
                  label='Your Account Name'
                  value={getTransactionDetailsSuccess.name}
                />
                <Row
                  label='Type'
                  value={getTransactionDetailsSuccess.historyPayment.type}
                />
                <Row
                  label='Bank Name'
                  value={getTransactionDetailsSuccess.historyPayment.bankName}
                />
                <Row
                  label='Bank Account Name'
                  value={getTransactionDetailsSuccess.historyPayment.name}
                />
                <Row
                  label='Bank Number'
                  value={getTransactionDetailsSuccess.historyPayment.accNumber}
                />
              </div>
              <div className='d-md-block d-flex flex-column w-100'>
                <a
                  className='btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg'
                  href='https://wa.me/083107955146'
                  role='button'
                >
                  WhatsApp ke Admin
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
