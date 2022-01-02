import axios from 'axios'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  API,
  configHeaderWithToken,
} from '../../utils'
import {
  GET_MEMBER_OVERVIEW,
  GET_MEMBER_TRANSACTIONS,
  GET_TRANSACTION_DETAILS,
  UPDATE_PROFILE,
} from '../types'

export const getMemberOverview = (token: string) => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_MEMBER_OVERVIEW)

  try {
    const { data } = await axios.get(
      `${API}/players/dashboard`,
      configHeaderWithToken(token)
    )

    dispatchSuccess(dispatch, GET_MEMBER_OVERVIEW, data ?? [])
  } catch (err) {
    dispatchError(dispatch, GET_MEMBER_OVERVIEW, err)
  }
}

export const getMemberTransactions = (value: string, token: string) => async (
  dispatch: any
) => {
  let params = ''

  if (value === 'all') {
    params = ''
  } else {
    params = `?status=${value}`
  }

  dispatchLoading(dispatch, GET_MEMBER_TRANSACTIONS)

  try {
    const { data } = await axios.get(
      `${API}/players/history${params}`,
      configHeaderWithToken(token)
    )

    dispatchSuccess(dispatch, GET_MEMBER_TRANSACTIONS, data ?? [])
  } catch (err) {
    dispatchError(dispatch, GET_MEMBER_TRANSACTIONS, err)
  }
}

export const getMemberTransactionDetails = (
  id: string,
  token: string
) => async (dispatch: any) => {
  dispatchLoading(dispatch, GET_TRANSACTION_DETAILS)

  try {
    const { data } = await axios.get(
      `${API}/players/history/${id}/detail`,
      configHeaderWithToken(token)
    )

    dispatchSuccess(dispatch, GET_TRANSACTION_DETAILS, data.data ?? {})
  } catch (err) {
    dispatchError(dispatch, GET_TRANSACTION_DETAILS, err)
  }
}

export const updateProfile = (newData: FormData, token: string) => async (
  dispatch: any
) => {
  dispatchLoading(dispatch, UPDATE_PROFILE)

  try {
    const { data } = await axios.put(
      `${API}/players/profile`,
      newData,
      configHeaderWithToken(token)
    )

    dispatchSuccess(dispatch, UPDATE_PROFILE, data.data ?? {})
  } catch (err) {
    dispatchError(dispatch, UPDATE_PROFILE, err)
  }
}
