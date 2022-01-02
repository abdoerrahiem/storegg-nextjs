import {
  GET_FEATURED_GAME,
  GET_DETAILS_VOUCHER,
  GET_GAME_CATEGORIES,
  CHECKOUT,
  GET_PROFILE,
  CLEAR_PLAYER_STATE,
  GET_PAYMENTS,
  CLEAR_CHECKOUT_STATE,
} from '../types'

const initialState = {
  getFeaturedGameLoading: false,
  getFeaturedGameSuccess: null,
  getFeaturedGameFail: null,

  getDetailsVoucherLoading: false,
  getDetailsVoucherSuccess: null,
  getDetailsVoucherFail: null,

  getGameCategoriesLoading: false,
  getGameCategoriesSuccess: null,
  getGameCategoriesFail: null,

  getPaymentsLoading: false,
  getPaymentsSuccess: null,
  getPaymentsFail: null,

  checkoutLoading: false,
  checkoutSuccess: null,
  checkoutFail: null,

  getProfileLoading: false,
  getProfileSuccess: null,
  getProfileFail: null,
}

export default function (state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_FEATURED_GAME:
      return {
        ...state,
        getFeaturedGameLoading: payload.loading,
        getFeaturedGameSuccess: payload.data,
        getFeaturedGameFail: payload.error,
      }
    case GET_DETAILS_VOUCHER:
      return {
        ...state,
        getDetailsVoucherLoading: payload.loading,
        getDetailsVoucherSuccess: payload.data,
        getDetailsVoucherFail: payload.error,
      }
    case GET_GAME_CATEGORIES:
      return {
        ...state,
        getGameCategoriesLoading: payload.loading,
        getGameCategoriesSuccess: payload.data,
        getGameCategoriesFail: payload.error,
      }
    case GET_PAYMENTS:
      return {
        ...state,
        getPaymentsLoading: payload.loading,
        getPaymentsSuccess: payload.data,
        getPaymentsFail: payload.error,
      }
    case CHECKOUT:
      return {
        ...state,
        checkoutLoading: payload.loading,
        checkoutSuccess: payload.data,
        checkoutFail: payload.error,
      }
    case GET_PROFILE:
      return {
        ...state,
        getProfileLoading: payload.loading,
        getProfileSuccess: payload.data,
        getProfileFail: payload.error,
      }
    case CLEAR_PLAYER_STATE:
      return {
        ...state,
        getProfileLoading: false,
        getProfileSuccess: null,
        getProfileFail: null,
      }
    case CLEAR_CHECKOUT_STATE:
      return {
        ...state,
        checkoutLoading: false,
        checkoutSuccess: null,
        checkoutFail: null,
      }
    default:
      return state
  }
}
