import instanceAxios from "../../axios/axios";
import { catchError, successFunc } from "../../helper/helper";
import { ADD_BLOG, CLEAR_RES_MESSAGE, DELETE_BLOG, GET_BLOGS, GET_BLOG_DETAILS, UPDATE_BLOG } from "../constants";

export const getBlogs = () => async (dispatch) => {
  await instanceAxios.get('/blog').then((response) => {
    dispatch({
      type: GET_BLOGS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_BLOGS, error))
  })
}

export const getBlogDetails = (blogId) => async (dispatch) => {
  await instanceAxios.get(`/blog/${blogId}`).then((response) => {
    dispatch({
      type: GET_BLOG_DETAILS,
      payload: {
        data: response?.data?.data,
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(GET_BLOG_DETAILS, error))
  })
}

export const addBlog = (data) => async (dispatch) => {
  const { user_id, blog_date, title, category_id, description, attachment } = data
  const bodyFormData = new FormData()
  bodyFormData.append('user_id', user_id)
  bodyFormData.append('blog_date', blog_date)
  bodyFormData.append('title', title)
  if (Array.isArray(category_id)) {
    category_id.forEach((item, index) => {
      bodyFormData.append(`category_id[${index}]`, item);
    })
  }
  bodyFormData.append('description', description)
  bodyFormData.append('attachment', attachment?.file)
  await instanceAxios.post('/blog', bodyFormData, { headers: { 'content-type': 'multipart/form-data' } }).then((response) => {
    dispatch({
      type: ADD_BLOG,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    dispatch(catchError(ADD_BLOG, error))
  })
}

export const updateBlog = (data, blogId) => async (dispatch) => {
  const { user_id, blog_date, title, category_id, description, attachment } = data
  const bodyFormData = new FormData()
  if (attachment?.file) {
    bodyFormData.append('attachment', attachment?.file)
  } else {
    const blobData = new Blob([attachment], { type: 'text/plain' })
    bodyFormData.append('attachment', blobData)
  }
  bodyFormData.append('user_id', user_id)
  bodyFormData.append('blog_date', blog_date)
  bodyFormData.append('title', title)
  if (Array.isArray(category_id)) {
    category_id.forEach((item, index) => {
      bodyFormData.append(`category_id[${index}]`, item);
    })
  }  bodyFormData.append('description', description)
  await instanceAxios.put(`/blog/${blogId}`, data).then((response) => {
    dispatch({
      type: UPDATE_BLOG,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
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
