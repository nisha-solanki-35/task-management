import instanceAxios from "../../axios/axios"
import { catchError } from "../../helper/helper"
import { GET_USER_DETAILS, UPDATE_USER_PROFILE } from "../constants"

export const getUserDetails = () => async (dispatch) => {
  await instanceAxios.get('/user').then((response) => {
    dispatch({
      type: GET_USER_DETAILS,
      payload: {
        data: response?.data?.data,
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_USER_DETAILS, error))
  })
}

export const updateUserProfile = (data) => async (dispatch) => {
  const { first_name, last_name, city, phone, email, profile_image } = data
  const bodyFormData = new FormData()
  if (profile_image?.file) {
    bodyFormData.append('profile_image', profile_image?.file)
  } else {
    const blobData = new Blob([profile_image], { type: 'text/plain' })
    bodyFormData.append('profile_image', blobData)
  }
  bodyFormData.append('first_name', first_name)
  bodyFormData.append('last_name', last_name)
  bodyFormData.append('city', city)
  bodyFormData.append('phone', phone)
  bodyFormData.append('email', email)
  await instanceAxios.post(`/user`, bodyFormData, { headers: { 'content-type': 'multipart/form-data' } }).then((response) => {
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(UPDATE_USER_PROFILE, error))
  })
}

