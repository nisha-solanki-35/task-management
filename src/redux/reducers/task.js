import { commonReducer } from '../../helper/helper'
import { ADD_TASK, CLEAR_RES_MESSAGE, DELETE_TASK, GET_TASKS, GET_TASK_DETAILS, UPDATE_TASK } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.data
      }
    case GET_TASK_DETAILS:
      return {
        ...state,
        taskDetails: action.payload.data
      }
    case ADD_TASK:
      return commonReducer(state, action)  
    case UPDATE_TASK:
      return commonReducer(state, action)
    case DELETE_TASK:
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
