import { REGISTER, LOGIN, CLEAR_AUTH_STATE } from '../types'

const initialState = {
  registerLoading: false,
  registerSuccess: null,
  registerFail: null,

  loginLoading: false,
  loginSuccess: null,
  loginFail: null,
}

export default function (state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case REGISTER:
      return {
        ...state,
        registerLoading: payload.loading,
        registerSuccess: payload.data,
        registerFail: payload.error,
      }
    case LOGIN:
      return {
        ...state,
        loginLoading: payload.loading,
        loginSuccess: payload.data,
        loginFail: payload.error,
      }
    case CLEAR_AUTH_STATE:
      return {
        registerLoading: false,
        registerSuccess: null,
        registerFail: null,

        loginLoading: false,
        loginSuccess: null,
        loginFail: null,
      }
    default:
      return state
  }
}
