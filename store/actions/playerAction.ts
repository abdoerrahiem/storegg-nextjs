import axios from 'axios'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  API,
  CheckoutTypes,
  configHeaderWithToken,
} from '../../utils'
import {
  GET_FEATURED_GAME,
  GET_DETAILS_VOUCHER,
  GET_GAME_CATEGORIES,
  CHECKOUT,
  GET_PROFILE,
  GET_PAYMENTS,
} from '../types'

export const getFeaturedGame = () => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_FEATURED_GAME)

  try {
    const { data } = await axios.get(`${API}/players/landingpage`)

    dispatchSuccess(dispatch, GET_FEATURED_GAME, data.data ?? [])
  } catch (err) {
    dispatchError(dispatch, GET_FEATURED_GAME, err)
  }
}

export const getDetailsVoucher = (id: string) => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_DETAILS_VOUCHER)

  try {
    const { data } = await axios.get(`${API}/players/${id}/detail`)

    dispatchSuccess(dispatch, GET_DETAILS_VOUCHER, data.data ?? {})
  } catch (err) {
    dispatchError(dispatch, GET_DETAILS_VOUCHER, err)
  }
}

export const getGameCategories = () => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_GAME_CATEGORIES)

  try {
    const { data } = await axios.get(`${API}/players/category`)

    dispatchSuccess(dispatch, GET_GAME_CATEGORIES, data.data ?? [])
  } catch (err) {
    dispatchError(dispatch, GET_GAME_CATEGORIES, err)
  }
}

export const getPayments = () => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_PAYMENTS)

  try {
    const { data } = await axios.get(`${API}/players/payments`)

    dispatchSuccess(dispatch, GET_PAYMENTS, data.data ?? [])
  } catch (err) {
    dispatchError(dispatch, GET_PAYMENTS, err)
  }
}

export const checkout = (newData: CheckoutTypes) => async (dispatch: any) => {
  dispatchLoading(dispatch, CHECKOUT)

  try {
    const { data } = await axios.post(
      `${API}/players/checkout`,
      newData,
      configHeaderWithToken(newData.token)
    )

    dispatchSuccess(dispatch, CHECKOUT, data.data ?? {})
  } catch (err) {
    dispatchError(dispatch, CHECKOUT, err)
  }
}

export const getProfile = (token: string) => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_PROFILE)

  try {
    const { data } = await axios.get(
      `${API}/players/profile`,
      configHeaderWithToken(token)
    )

    dispatchSuccess(dispatch, GET_PROFILE, data.data ?? {})
  } catch (err) {
    dispatchError(dispatch, GET_PROFILE, err)
  }
}
