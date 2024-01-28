import instanceAxios from "../../axios/axios";
import { catchError, successFunc } from "../../helper/helper";
import { ADD_TASK_LIST, CLEAR_RES_MESSAGE, DELETE_TASK_LIST, GET_TASK_LIST, GET_TASK_LIST_DETAILS, UPDATE_TASK_LIST } from "../constants";

export const getTaskList = () => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.get('/task/list').then((response) => {
    dispatch({
      type: GET_TASK_LIST,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_TASK_LIST, error))
  })
}

export const getTaskListDetails = (taskListId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.get(`/task/list/${taskListId}`).then((response) => {
    dispatch({
      type: GET_TASK_LIST_DETAILS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_TASK_LIST_DETAILS, error))
  })
}

export const addTaskList = (data) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.post('/task/list', data).then((response) => {
    dispatch({
      type: ADD_TASK_LIST,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(ADD_TASK_LIST, error))
  })
}

export const updateTaskList = (data, taskListId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.put(`/task/list/${taskListId}`, data).then((response) => {
    dispatch({
      type: UPDATE_TASK_LIST,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(UPDATE_TASK_LIST, error))
  })
}

export const deleteTaskList = (taskListId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.delete(`/task/list/${taskListId}`).then((response) => {
    dispatch(successFunc(DELETE_TASK_LIST, response))
  }).catch((error) => {
    dispatch(catchError(DELETE_TASK_LIST, error))
  })
}
