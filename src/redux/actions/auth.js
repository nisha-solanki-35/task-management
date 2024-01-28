import instanceAxios from "../../axios/axios"
import { catchError } from "../../helper/helper";
import { LOGIN, REGISTER } from "../constants";

export const login = (data) => async (dispatch) => {
  await instanceAxios.post('/login', data).then((response) => {
    localStorage.setItem('Token', response?.data?.data?.token)
    const userData = {
      name: response?.data?.data?.first_name + response?.data?.data?.last_name,
      id: response?.data?.data?.id
    }
    localStorage.setItem('UserData', userData)
    dispatch({
      type: LOGIN,
      payload: {
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    dispatch(catchError(LOGIN, error))
  })
}

export const register = (data) => async (dispatch) => {
  await instanceAxios.post('/register', data).then((response) => {
    localStorage.setItem('Token', response?.data?.data?.token)
    const userData = {
      name: response?.data?.data?.first_name + response?.data?.data?.last_name,
      id: response?.data?.data?.id
    }
    localStorage.setItem('UserData', userData)
    dispatch({
      type: REGISTER,
      payload: {
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    dispatch(catchError(REGISTER, error))
  })
}