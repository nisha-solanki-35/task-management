export function successFunc (type, response) {
  return {
    type,
    payload: {
      successMessage: response.data.message
    }
  }
}

export function catchError (type, error) {
  return {
    type,
    payload: {
      errorMessage: error?.response?.data?.data || error?.response?.data?.message || 'Server unavailable'
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