import { commonReducer } from '../../helper/helper'
import { ADD_CATEGORY, CLEAR_RES_MESSAGE, DELETE_CATEGORY, GET_CATEGORY, GET_CATEGORY_DETAILS, UPDATE_CATEGORY } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categoryList: action.payload.data
      }
    case GET_CATEGORY_DETAILS:
      return {
        ...state,
        categoryDetails: action.payload.data
      }
    case ADD_CATEGORY:
      return commonReducer(state, action)  
    case UPDATE_CATEGORY:
      return commonReducer(state, action)
    case DELETE_CATEGORY:
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
