import router, { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import Swal from 'sweetalert2'

import { BanksTypes, NominalsTypes, PaymentTypes } from '../../../utils'
import NominalItem from './NominalItem'
import PaymentItem from './PaymentItem'

interface TopUpFormProps {
  nominals: NominalsTypes[]
  payments: PaymentTypes[]
  data: {
    name: string
    thumbnail: string
    category: {
      name: string
    }
  }
}

export default function TopUpForm({
  nominals,
  payments,
  data,
}: TopUpFormProps) {
  const [verifyID, setVerifyID] = useState('')
  const [bankAccountName, setBankAccountName] = useState('')
  const [nominalItem, setNominalItem] = useState({})
  const [paymentItem, setPaymentItem] = useState({})
  const { push } = useRouter()

  const handleNominalChange = (data: NominalsTypes) => setNominalItem(data)

  const handlePaymentChange = (payment: PaymentTypes, bank: BanksTypes) => {
    setPaymentItem({ payment, bank })
  }

  const handleSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault()

    if (
      verifyID === '' ||
      bankAccountName === '' ||
      Object.keys(nominalItem).length === 0 ||
      Object.keys(paymentItem).length === 0
    )
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Data tidak lengkap',
      })

    localStorage.setItem(
      'data-topup',
      JSON.stringify({
        verifyID,
        bankAccountName,
        nominalItem,
        paymentItem,
      })
    )

    localStorage.setItem('data-item', JSON.stringify(data))

    push('/checkout')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='pt-md-50 pt-30'>
        <div className=''>
          <label
            htmlFor='ID'
            className='form-label text-lg fw-medium color-palette-1 mb-10'
          >
            Verify ID
          </label>
          <input
            type='text'
            className='form-control rounded-pill text-lg'
            id='ID'
            name='ID'
            aria-describedby='verifyID'
            placeholder='Enter your ID'
            value={verifyID}
            onChange={(e) => setVerifyID(e.target.value)}
          />
        </div>
      </div>
      <div className='pt-md-50 pb-md-50 pt-30 pb-20'>
        <p className='text-lg fw-medium color-palette-1 mb-md-10 mb-0'>
          Nominal Top Up
        </p>
        <div className='row justify-content-between'>
          {nominals.map((nominal) => (
            <NominalItem
              key={nominal._id}
              _id={nominal._id}
              coinQuantity={nominal.coinQuantity}
              coinName={nominal.coinName}
              price={nominal.price}
              onChange={() => handleNominalChange(nominal)}
            />
          ))}
          <div className='col-lg-4 col-sm-6'></div>
        </div>
      </div>
      <div className='pb-md-50 pb-20'>
        <p className='text-lg fw-medium color-palette-1 mb-md-10 mb-0'>
          Payment Method
        </p>
        <fieldset id='paymentMethod'>
          <div className='row justify-content-between'>
            {payments.map((payment) =>
              payment.banks.map((bank) => (
                <PaymentItem
                  key={bank._id}
                  bankID={bank._id}
                  type={payment.type}
                  name={bank.bankName}
                  onChange={() => handlePaymentChange(payment, bank)}
                />
              ))
            )}
            <div className='col-lg-4 col-sm-6'></div>
          </div>
        </fieldset>
      </div>
      <div className='pb-50'>
        <label
          htmlFor='bankAccount'
          className='form-label text-lg fw-medium color-palette-1 mb-10'
        >
          Bank Account Name
        </label>
        <input
          type='text'
          className='form-control rounded-pill text-lg'
          id='bankAccount'
          name='bankAccount'
          aria-describedby='bankAccount'
          placeholder='Enter your Bank Account Name'
          value={bankAccountName}
          onChange={(e) => setBankAccountName(e.target.value)}
        />
      </div>
      <div className='d-sm-block d-flex flex-column w-100'>
        <button
          type='submit'
          className='btn btn-submit rounded-pill fw-medium text-white border-0 text-lg'
        >
          Continue
        </button>
      </div>
    </form>
  )
}
