export const dispatchLoading = (dispatch: any, type: string) => {
  return dispatch({
    type,
    payload: {
      loading: true,
      data: null,
      error: null,
    },
  })
}

export const dispatchSuccess = (dispatch: any, type: string, data: any) => {
  return dispatch({
    type,
    payload: {
      loading: false,
      data,
      error: null,
    },
  })
}

export const dispatchError = (dispatch: any, type: string, error: any) => {
  return dispatch({
    type,
    payload: {
      loading: false,
      data: null,
      error,
    },
  })
}
