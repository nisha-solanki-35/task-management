import { commonReducer } from '../../helper/helper'
import { ADD_TASK_LIST, CLEAR_RES_MESSAGE, DELETE_TASK_LIST, GET_TASK_LIST, GET_TASK_LIST_DETAILS, UPDATE_TASK_LIST } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TASK_LIST:
      return {
        ...state,
        taskList: action.payload.data
      }
    case GET_TASK_LIST_DETAILS:
      return {
        ...state,
        taskListDetails: action.payload.data
      }
    case ADD_TASK_LIST:
      return commonReducer(state, action)  
    case UPDATE_TASK_LIST:
      return commonReducer(state, action)
    case DELETE_TASK_LIST:
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
