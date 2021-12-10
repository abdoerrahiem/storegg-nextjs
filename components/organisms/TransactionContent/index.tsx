import { useState } from 'react'
import NumberFormat from 'react-number-format'
import ButtonTab from './ButtonTab'
import TableRow from './TableRow'

export default function TransactionContent() {
  const [buttons] = useState([
    { id: 1, title: 'All Trx' },
    { id: 2, title: 'Success' },
    { id: 3, title: 'Pending' },
    { id: 4, title: 'Failed' },
  ])
  const [activeButton, setActiveButton] = useState(1)

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
              value={6000000}
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
                  onClick={() => setActiveButton(btn.id)}
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
                <TableRow
                  image='/img/overview-1.png'
                  title='Mobile Legend'
                  category='Mobile'
                  item='200 Gold'
                  price={290000}
                  status='pending'
                  id='1'
                />
                <TableRow
                  image='/img/overview-2.png'
                  title='Call of Duty: Modern'
                  category='Mobile'
                  item='200 Gold'
                  price={290000}
                  status='failed'
                  id='1'
                />
                <TableRow
                  image='/img/overview-3.png'
                  title='Clash of Clans'
                  category='Mobile'
                  item='200 Gold'
                  price={290000}
                  status='success'
                  id='1'
                />
                <TableRow
                  image='/img/overview-4.png'
                  title='The Roya Game'
                  category='Dekstop'
                  item='200 Gold'
                  price={290000}
                  status='pending'
                  id='1'
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
