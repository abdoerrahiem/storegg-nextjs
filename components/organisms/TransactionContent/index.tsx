import Cookies from 'js-cookie'
import { useState } from 'react'
import NumberFormat from 'react-number-format'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux'
import { getMemberTransactions } from '../../../store/actions'
import { HistoryTransactionTypes, IMAGE_API } from '../../../utils'

import ButtonTab from './ButtonTab'
import TableRow from './TableRow'

export default function TransactionContent() {
  const [buttons] = useState([
    { id: 1, title: 'All Trx', query: 'all' },
    { id: 2, title: 'Success', query: 'success' },
    { id: 3, title: 'Pending', query: 'pending' },
    { id: 4, title: 'Failed', query: 'failed' },
  ])
  const [activeButton, setActiveButton] = useState(1)

  const dispatch = useDispatch()
  const { getMemberTransactionsSuccess } = useSelector(
    (state: RootStateOrAny) => state.memberReducer
  )

  return (
    <main className='main-wrapper'>
      <div className='ps-lg-0'>
        <h2 className='text-4xl fw-bold color-palette-1 mb-30'>
          My Transactions
        </h2>
        <div className='mb-30'>
          <p className='text-lg color-palette-2 mb-12'>You’ve spent</p>
          <h3 className='text-5xl fw-medium color-palette-1'>
            <NumberFormat
              value={getMemberTransactionsSuccess?.total}
              prefix='Rp. '
              displayType='text'
              thousandSeparator='.'
              decimalSeparator=','
            />
          </h3>
        </div>
        <div className='row mt-30 mb-20'>
          <div className='col-lg-12 col-12 main-content'>
            <div id='list_status_title'>
              {buttons.map((btn) => (
                <ButtonTab
                  key={btn.id}
                  active={btn.id === activeButton}
                  title={btn.title}
                  onClick={() => [
                    setActiveButton(btn.id),
                    dispatch(
                      getMemberTransactions(btn.query, Cookies.get('token')!)
                    ),
                  ]}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='latest-transaction'>
          <p className='text-lg fw-medium color-palette-1 mb-14'>
            Latest Transactions
          </p>
          <div className='main-content main-content-table overflow-auto'>
            <table className='table table-borderless'>
              <thead>
                <tr className='color-palette-1'>
                  <th className='' scope='col'>
                    Game
                  </th>
                  <th scope='col'>Item</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody id='list_status_item'>
                {getMemberTransactionsSuccess?.data.map(
                  (transaction: HistoryTransactionTypes) => (
                    <TableRow
                      key={transaction._id}
                      image={`${IMAGE_API}/${transaction.historyVoucherTopup.thumbnail}`}
                      title={transaction.historyVoucherTopup.gameName}
                      category={transaction.historyVoucherTopup.category}
                      item={`${transaction.historyVoucherTopup.coinQuantity} ${transaction.historyVoucherTopup.coinName}`}
                      price={transaction.value}
                      status={transaction.status}
                      id={transaction._id}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
