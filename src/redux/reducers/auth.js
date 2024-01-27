import { LOGIN } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload.data,
        successMessage: action.payload.successMessage
      }
    default:
      return state
  }
}
