import instanceAxios from "../../axios/axios";
import { catchError, successFunc } from "../../helper/helper";
import { ADD_BLOG, CLEAR_RES_MESSAGE, DELETE_BLOG, GET_BLOGS, GET_BLOG_DETAILS, UPDATE_BLOG } from "../constants";

export const getBlogs = (category_id, created_by) => async (dispatch) => {
  await instanceAxios.get(`/blog?category_id=${category_id}&created_by=${created_by}`).then((response) => {
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
  const { title, category_id, description, attachment } = data
  let url
  const bodyFormData = new FormData()
  if (attachment?.file) {
    bodyFormData.append('title', title)
    // if (Array.isArray(category_id)) {
    //   category_id.forEach((item, index) => {
    //     bodyFormData.append(`category_id[${index}]`, item)
    //   })
    // }
    bodyFormData.append('category_id', category_id)
    bodyFormData.append('description', description)
    bodyFormData.append('attachment', attachment?.file)
    url = {
      method: 'put',
      url: `/blog/${blogId}`,
      data: bodyFormData,
      headers: { 'content-type': 'multipart/form-data' }
    }
  } else {
    url = {
      method: 'put',
      url: `/blog/${blogId}`,
      data: data,
    }
  }
  console.log('url', url)
  // bodyFormData.append('user_id', user_id)
  // bodyFormData.append('blog_date', blog_date)
  await instanceAxios(url).then((response) => {
    dispatch({
      type: UPDATE_BLOG,
      payload: {
        successMessage: response.data.message
      }
    })
  }).catch((error) => {
    console.log('error', error)
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
