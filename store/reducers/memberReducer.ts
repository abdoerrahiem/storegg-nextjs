import {
  GET_MEMBER_OVERVIEW,
  GET_MEMBER_TRANSACTIONS,
  GET_TRANSACTION_DETAILS,
  UPDATE_PROFILE,
  CLEAR_MEMBER_STATE,
} from '../types'

const initialState = {
  getMemberOverviewLoading: false,
  getMemberOverviewSuccess: null,
  getMemberOverviewFail: null,

  getMemberTransactionsLoading: false,
  getMemberTransactionsSuccess: null,
  getMemberTransactionsFail: null,

  getTransactionDetailsLoading: false,
  getTransactionDetailsSuccess: null,
  getTransactionDetailsFail: null,

  updateProfileLoading: false,
  updateProfileSuccess: null,
  updateProfileFail: null,
}

export default function (state = initialState, action: any) {
  const { type, payload } = action

  switch (type) {
    case GET_MEMBER_OVERVIEW:
      return {
        ...state,
        getMemberOverviewLoading: payload.loading,
        getMemberOverviewSuccess: payload.data,
        getMemberOverviewFail: payload.error,
      }
    case GET_MEMBER_TRANSACTIONS:
      return {
        ...state,
        getMemberTransactionsLoading: payload.loading,
        getMemberTransactionsSuccess: payload.data,
        getMemberTransactionsFail: payload.error,
      }
    case GET_TRANSACTION_DETAILS:
      return {
        ...state,
        getTransactionDetailsLoading: payload.loading,
        getTransactionDetailsSuccess: payload.data,
        getTransactionDetailsFail: payload.error,
      }
    case UPDATE_PROFILE:
      return {
        ...state,
        updateProfileLoading: payload.loading,
        updateProfileSuccess: payload.data,
        updateProfileFail: payload.error,
      }
    case CLEAR_MEMBER_STATE:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileSuccess: null,
        updateProfileFail: null,
      }
    default:
      return state
  }
}
