import axios from 'axios'
import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  API,
  LoginTypes,
  configHeader,
} from '../../utils'
import { LOGIN, REGISTER } from '../types'
import Cookies from 'js-cookie'
import { getProfile } from '.'

export const register = (newData: FormData) => async (dispatch: any) => {
  dispatchLoading(dispatch, REGISTER)

  try {
    const { data } = await axios.post(
      `${API}/auth/register`,
      newData,
      configHeader
    )

    dispatchSuccess(dispatch, REGISTER, data ?? {})

    Cookies.set('token', data.data.token, { expires: 7 })

    dispatch(getProfile(data.data.token))
  } catch (err: any) {
    if (err.response.data.message) {
      dispatchError(dispatch, REGISTER, err.response.data.message)
    } else {
      dispatchError(dispatch, REGISTER, err.response.data)
    }
  }
}

export const login = (newData: LoginTypes) => async (dispatch: any) => {
  dispatchLoading(dispatch, LOGIN)

  try {
    const { data } = await axios.post(
      `${API}/auth/login`,
      newData,
      configHeader
    )

    dispatchSuccess(dispatch, LOGIN, data ?? {})

    Cookies.set('token', data.data.token, { expires: 7 })

    dispatch(getProfile(data.data.token))
  } catch (err: any) {
    if (err.response.data.message) {
      dispatchError(dispatch, LOGIN, err.response.data.message)
    } else {
      dispatchError(dispatch, LOGIN, err.response.data)
    }
  }
}
