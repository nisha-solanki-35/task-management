import instanceAxios from "../../axios/axios"
import { catchError } from "../../helper/helper"
import { GET_USER_DETAILS, UPDATE_USER_PROFILE } from "../constants"

export const getUserDetails = () => async (dispatch) => {
  await instanceAxios.get('/user').then((response) => {
    console.log('response :>> ', response)
    dispatch({
      type: GET_USER_DETAILS,
      payload: {
        data: response?.data?.data,
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response)
    dispatch(catchError(GET_USER_DETAILS, error))
  })
}

export const updateUserProfile = (data) => async (dispatch) => {
  await instanceAxios.post(`/user`, data).then((response) => {
    console.log('response :>> ', response)
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response)
    dispatch(catchError(UPDATE_USER_PROFILE, error))
  })
}

