import instanceAxios from "../../axios/axios";
import { catchError, successFunc } from "../../helper/helper";
import { ADD_BLOG, CLEAR_RES_MESSAGE, DELETE_BLOG, GET_BLOGS, GET_BLOG_DETAILS, UPDATE_BLOG } from "../constants";

export const getBlogs = () => async (dispatch) => {
  await instanceAxios.get('/blog').then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: GET_BLOGS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(GET_BLOGS, error))
  })
}

export const getBlogDetails = (blogId) => async (dispatch) => {
  await instanceAxios.get(`/blog/${blogId}`).then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: GET_BLOG_DETAILS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(GET_BLOG_DETAILS, error))
  })
}

export const addBlog = (data) => async (dispatch) => {
  await instanceAxios.post('/blog', data).then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: ADD_BLOG,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(ADD_BLOG, error))
  })
}

export const updateBlog = (data, blogId) => async (dispatch) => {
  await instanceAxios.put(`/blog/${blogId}`, data).then((response) => {
    console.log('response :>> ', response);
    dispatch({
      type: UPDATE_BLOG,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error?.response :>> ', error?.response);
    dispatch(catchError(UPDATE_BLOG, error))
  })
}

export const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: CLEAR_RES_MESSAGE })
  await instanceAxios.delete(`/blog/${blogId}`).then((response) => {
    dispatch(successFunc(DELETE_BLOG, response))
  }).catch((error) => {
    dispatch(catchError(DELETE_BLOG, error))
  })
}
