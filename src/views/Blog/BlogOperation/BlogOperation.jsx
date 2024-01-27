import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, ErrorText, Form, FormContainer, Input } from '../../../components/FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../../components/Alert'
import { addBlog, getBlogDetails, updateBlog } from '../../../redux/actions/blog'
import PropTypes from 'prop-types'

const validate = values => {
  const requiredFields = ['title', 'category_id', 'description', 'attachment']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

function BlogOperation (props) {
  const { blogId } = props
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const blogDetails = useSelector(state => state.blog.blogDetails)
  const successMessage = useSelector(state => state.blog.successMessage)
  const errorMessage = useSelector(state => state.blog.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (blogId) {
      dispatch(getBlogDetails(blogId))
    }
  }, [])
  console.log('blogDetails :>> ', blogDetails)

  useEffect(() => {
    if (successMessage) {
      if (blogId) {
        setMessage(successMessage)
        setAlert(true)
        setSuccess(true)
      } else {
        navigate('/blogs', {
          state: { message: successMessage }
        })
      }
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
    }
  }, [errorMessage])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  const formik = useFormik({
    initialValues: blogId ? {
      title: blogDetails?.title,
      category_id: blogDetails?.category_id,
      description: blogDetails?.description,
      attachment: blogDetails?.attachment
    } 
    : {
      title: '',
      category_id: '',
      description: '',
      attachment: ''
    },
    validate,
    onSubmit: values => {
      console.log('Form values:', values)
      if (blogId) {
        dispatch(updateBlog(values))
      } else {
        dispatch(addBlog(values))
      }
    }
  })

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.title && formik.errors.title}
          id="title"
          name="title"
          onChange={formik.handleChange}
          placeholder="Title"
          type="text"
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <ErrorText>{formik.errors.title}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.category_id && formik.errors.category_id}
          id="category_id"
          name="category_id"
          onChange={formik.handleChange}
          placeholder="Category"
          type="category_id"
          value={formik.values.category_id}
        />
        {formik.touched.category_id && formik.errors.category_id ? (
          <ErrorText>{formik.errors.category_id}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.description && formik.errors.description}
          id="description"
          name="description"
          onChange={formik.handleChange}
          placeholder="Description"
          type="textarea"
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <ErrorText>{formik.errors.description}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.attachment && formik.errors.attachment}
          id="attachment"
          name="attachment"
          onChange={formik.handleChange}
          placeholder="Attachment"
          type="file"
          value={formik.values.attachment}
        />
        {formik.touched.attachment && formik.errors.attachment ? (
          <ErrorText>{formik.errors.attachment}</ErrorText>
        ) : null}
        <Button type="submit">{blogId ? 'Save changes' : 'Add Blog'}</Button>
      </Form>
    </FormContainer>
  )
}

BlogOperation.propTypes = {
  blogId: PropTypes.string
}

export default BlogOperation
