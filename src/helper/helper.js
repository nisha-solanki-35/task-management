export function successFunc (type, response) {
  return {
    type,
    payload: {
      successMessage: response.data.message
    }
  }
}

export function catchError (type, error) {
  let err
  if (error?.response?.data?.data?.error) {
    err = error?.response?.data?.data?.error
  } else if (error?.response?.data?.data) {
    err = error?.response?.data?.data
  } else if (error?.response?.data?.message) {
    err = error?.response?.data?.message
  } else {
    err = 'Server unavailable'
  }
  return {
    type,
    payload: {
      errorMessage: err
    }
  }
}

export function commonReducer (state, action) {
  return {
    ...state,
    successMessage: action.payload.successMessage,
    errorMessage: action.payload.errorMessage
  }
}