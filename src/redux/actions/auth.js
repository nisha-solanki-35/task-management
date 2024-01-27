import instanceAxios from "../../axios/axios"
import { catchError } from "../../helper/helper";
import { LOGIN, REGISTER } from "../constants";

export const login = (data) => async (dispatch) => {
  await instanceAxios.post('/login', data).then((response) => {
    console.log('response :>> ', response);
    localStorage.setItem('Token', response.data.Authorization)
    localStorage.setItem('userData', JSON.stringify(response.data.data))
    dispatch({
      type: LOGIN,
      payload: {
        data: response.data.data,
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(LOGIN, error))
  })
}

export const register = (data) => async (dispatch) => {
  await instanceAxios.post('/register', data).then((response) => {
    console.log('response :>> ', response);
    localStorage.setItem('Token', response.data.Authorization)
    localStorage.setItem('userData', JSON.stringify(response.data.data))
    dispatch({
      type: REGISTER,
      payload: {
        data: response.data.data,
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(REGISTER, error))
  })
}