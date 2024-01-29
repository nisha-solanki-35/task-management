import instanceAxios from "../../axios/axios"
import { catchError } from "../../helper/helper";
import { LOGIN, REGISTER } from "../constants";

export const login = (data) => async (dispatch) => {
  await instanceAxios.post('/login', data).then((response) => {
    localStorage.setItem('Token', response?.data?.data?.token)
    const userData = {
      name: response?.data?.data?.first_name + ' ' + response?.data?.data?.last_name,
      id: response?.data?.data?.id
    }
    localStorage.setItem('UserData', JSON.stringify(userData))
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
  const { first_name, last_name, city, phone, email, profile_image } = data
  const bodyFormData = new FormData()
  bodyFormData.append('first_name', first_name)
  bodyFormData.append('last_name', last_name)
  bodyFormData.append('city', city)
  bodyFormData.append('phone', phone)
  bodyFormData.append('email', email)
  bodyFormData.append('profile_image', profile_image?.file)
  await instanceAxios.post('/register', bodyFormData, { headers: { 'content-type': 'multipart/form-data' } }).then((response) => {
    localStorage.setItem('Token', response?.data?.data?.token)
    const userData = {
      name: response?.data?.data?.first_name + ' ' + response?.data?.data?.last_name,
      id: response?.data?.data?.id
    }
    localStorage.setItem('UserData', JSON.stringify(userData))
    dispatch({
      type: REGISTER,
      payload: {
        userData: response?.data?.data,
        successMessage: response.data.message,
      }
    })
  }).catch((error) => {
    dispatch(catchError(REGISTER, error))
  })
}