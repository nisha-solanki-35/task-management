import instanceAxios from "../../axios/axios";
import { catchError, successFunc } from "../../helper/helper";
import { ADD_CATEGORY, CLEAR_RES_MESSAGE, DELETE_CATEGORY, GET_CATEGORY, GET_CATEGORY_DETAILS, UPDATE_CATEGORY } from "../constants";

export const getCategories = () => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.get('/category').then((response) => {
    dispatch({
      type: GET_CATEGORY,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message,
        resStatus: true
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_CATEGORY, error))
  })
}

export const getCategoryDetails = (categoryId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.get(`/category/${categoryId}`).then((response) => {
    dispatch({
      type: GET_CATEGORY_DETAILS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_CATEGORY_DETAILS, error))
  })
}

export const addCategory = (data) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.post('/category', data).then((response) => {
    dispatch({
      type: ADD_CATEGORY,
      payload: {
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    dispatch(catchError(ADD_CATEGORY, error))
  })
}

export const updateCategory = (data, categoryId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.put(`/category/${categoryId}`, data).then((response) => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: {
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    dispatch(catchError(UPDATE_CATEGORY, error))
  })
}

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.delete(`/category/${categoryId}`).then((response) => {
    dispatch(successFunc(DELETE_CATEGORY, response))
  }).catch((error) => {
    dispatch(catchError(DELETE_CATEGORY, error))
  })
}
