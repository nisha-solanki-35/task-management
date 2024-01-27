import { commonReducer } from '../../helper/helper'
import { ADD_BLOG, CLEAR_RES_MESSAGE, DELETE_BLOG, GET_BLOGS, GET_BLOG_DETAILS, UPDATE_BLOG } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_BLOGS:
      return {
        ...state,
        blogList: action.payload.data
      }
    case GET_BLOG_DETAILS:
      return {
        ...state,
        blogDetails: action.payload.data
      }
    case ADD_BLOG:
      return commonReducer(state, action)
    case UPDATE_BLOG:
      return commonReducer(state, action)
    case DELETE_BLOG:
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
