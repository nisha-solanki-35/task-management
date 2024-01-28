import { LOGIN, REGISTER } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        successMessage: action.payload.successMessage,
        errorMessage: action.payload.errorMessage
      }
    case REGISTER:
      return {
        ...state,
        successMessage: action.payload.successMessage,
        errorMessage: action.payload.errorMessage
      }
    default:
      return state
  }
}
