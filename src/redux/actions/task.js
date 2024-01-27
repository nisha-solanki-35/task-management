import instanceAxios from "../../axios/axios";
import { catchError, successFunc } from "../../helper/helper";
import { ADD_TASK, CLEAR_RES_MESSAGE, DELETE_TASK, GET_TASKS, GET_TASK_DETAILS, UPDATE_TASK } from "../constants";

export const getTasks = () => async (dispatch) => {
  await instanceAxios.get('/task').then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: GET_TASKS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(GET_TASKS, error))
  })
}

export const getTaskDetails = (taskId) => async (dispatch) => {
  await instanceAxios.get(`/task/${taskId}`).then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: GET_TASK_DETAILS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(GET_TASK_DETAILS, error))
  })
}

export const addTask = (data) => async (dispatch) => {
  await instanceAxios.post('/task', data).then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: ADD_TASK,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(ADD_TASK, error))
  })
}

export const updateTask = (data, taskId) => async (dispatch) => {
  await instanceAxios.put(`/task/${taskId}`, data).then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: UPDATE_TASK,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(UPDATE_TASK, error))
  })
}

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.delete(`/task/${taskId}`).then((response) => {
    dispatch(successFunc(DELETE_TASK, response))
  }).catch((error) => {
    dispatch(catchError(DELETE_TASK, error))
  })
}
