import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { checkout } from '../../../store/actions'
import Cookies from 'js-cookie'
import Spinner from '../../atoms/Spinner'
import { CLEAR_CHECKOUT_STATE } from '../../../store/types'

export default function CheckoutConfirm() {
  const [checked, setChecked] = useState(false)

  const { push } = useRouter()

  const dispatch = useDispatch()
  const { checkoutLoading, checkoutFail, checkoutSuccess } = useSelector(
    (state: RootStateOrAny) => state.playerReducer
  )

  useEffect(() => {
    if (checkoutFail) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: checkoutFail,
      })
    }

    if (checkoutSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Congratulations...',
        text: 'Checkout berhasil',
        timer: 2000,
      })

      dispatch({ type: CLEAR_CHECKOUT_STATE })
      push('/checkout-complete')
    }
  }, [checkoutSuccess, checkoutFail])

  const handleClick = () => {
    if (!checked)
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pastikan anda telah melakukan pembayaran',
      })

    const dataItemLocal = localStorage.getItem('data-item')
    const dataTopUpLocal = localStorage.getItem('data-topup')

    const dataItem = JSON.parse(dataItemLocal!)
    const dataTopUp = JSON.parse(dataTopUpLocal!)

    const data = {
      token: Cookies.get('token')!,
      voucher: dataItem._id,
      nominal: dataTopUp.nominalItem._id,
      payment: dataTopUp.paymentItem.payment._id,
      bank: dataTopUp.paymentItem.bank._id,
      // name: dataTopUp.bankAccountName,
      // accountUser: dataTopUp.verifyID,
    }

    dispatch(checkout(data))
  }

  return (
    <>
      <label className='checkbox-label text-lg color-palette-1'>
        I have transferred the money
        <input
          type='checkbox'
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span className='checkmark'></span>
      </label>
      <div className='d-md-block d-flex flex-column w-100 pt-50'>
        <button
          className='btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg'
          type='button'
          onClick={handleClick}
        >
          {checkoutLoading ? <Spinner /> : 'Confirm Payment'}
        </button>
      </div>
    </>
  )
}
