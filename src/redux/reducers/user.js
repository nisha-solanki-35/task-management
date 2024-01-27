import { commonReducer } from '../../helper/helper'
import { CLEAR_RES_MESSAGE, GET_USER_DETAILS, UPDATE_USER_PROFILE } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload.data,
      }
    case UPDATE_USER_PROFILE:
      return commonReducer(state, action)
    case CLEAR_RES_MESSAGE:
      return {
        successMessage: '',
        errorMessage: ''
      }
    default:
      return state
  }
}
