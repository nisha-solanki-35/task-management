import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Container, ErrorText, Form, FormContainer, Input, SelectContainer } from '../../../components/FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../../components/Alert'
import { addBlog, getBlogDetails, updateBlog } from '../../../redux/actions/blog'
import PropTypes from 'prop-types'
import moment from 'moment'
import { getCategories } from '../../../redux/actions/category'
import makeAnimated from 'react-select/animated'
import Select from 'react-select'
const animatedComponents = makeAnimated()

const validate = values => {
  const requiredFields = ['user_id', 'blog_date', 'category_id', 'description', 'attachment']
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
  const categories = useSelector(state => state.category.categoryList)
  const blogDetails = useSelector(state => state.blog.blogDetails)
  const successMessage = useSelector(state => state.blog.successMessage)
  const errorMessage = useSelector(state => state.blog.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    dispatch(getCategories())
    if (blogId) {
      dispatch(getBlogDetails(blogId))
    }
  }, [])

  useEffect(() => {
    if (categories) {
      const arr = []
      if (categories?.data?.length > 0) {
        categories?.data?.map((data) => {
          const obj = {
            value: data?.id,
            label: data?.name
          }
          arr?.push(obj)
          return arr
        })
        setOptions(arr)
      }
    }
  }, [categories])

  useEffect(() => {
    if (successMessage) {
      if (blogId) {
        setMessage(successMessage)
        setAlert(true)
        setSuccess(true)
        dispatch(getBlogDetails(blogId))
      } else {
        navigate('/blogs', {
          state: { message: successMessage }
        })
      }
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      if (typeof errorMessage === 'string') {
        setMessage(errorMessage)
        setAlert(true)
        setSuccess(false)
      } else {
        formik.setErrors(errorMessage)
      }
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
    initialValues: {
      user_id: JSON.parse(localStorage.getItem('UserData'))?.id || '',
      blog_date: moment(Date.now()).format('DD-MM-YYYY') || '',
      title: '',
      category_id: [],
      description: '',
      attachment: ''
    },
    validate,
    onSubmit: values => {
      if (blogId) {
        const selected = []
        values?.category_id.map((data) => {
          selected.push(data.value)
          return selected
        })
        const data = {
          ...values,
          category_id: [...selected],
          attachment: values.attachment?.file ? values.attachment : undefined
        }
        dispatch(updateBlog(data, blogId))
      } else {
        const selected = []
        values?.category_id.map((data) => {
          selected.push(data.value)
          return selected
        })
        const data = {
          ...values,
          category_id: [...selected],
          attachment: values.attachment?.file ? values.attachment : undefined
        }
        dispatch(addBlog(data))
      }
    }
  })

  useEffect(() => {
    if (blogDetails) {
      const arr = []
      blogDetails?.category?.map((data) => {
        const obj = {
          value: data?.id,
          label: data?.name
        }
        arr?.push(obj)
        return arr
      })
      formik.setValues({
        user_id: JSON.parse(localStorage.getItem('UserData'))?.id || '',
        blog_date: moment(Date.now()).format('DD-MM-YYYY') || '',
        title: blogDetails?.title|| '',
        category_id: arr || '',
        description: blogDetails?.description|| '',
        attachment: blogDetails?.attachment || ''
      })
    }
  }, [blogDetails])

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          disabled
          error={formik?.touched?.user_id && formik?.errors?.user_id}
          id="user_id"
          name="user_id"
          onChange={formik.handleChange}
          placeholder="User Id"
          type="text"
          value={formik?.values?.user_id}
        />
        {formik?.touched?.user_id && formik?.errors?.user_id ? (
          <ErrorText>{formik?.errors?.user_id}</ErrorText>
        ) : null}
        <Input
          disabled
          error={formik?.touched?.blog_date && formik?.errors?.blog_date}
          id="blog_date"
          name="blog_date"
          onChange={formik.handleChange}
          placeholder="Date"
          type="text"
          value={formik.values.blog_date}
        />
        {formik.touched.blog_date && formik.errors.blog_date ? (
          <ErrorText>{formik.errors.blog_date}</ErrorText>
        ) : null}
        <Input
          error={formik?.touched?.title && formik?.errors?.title}
          id="title"
          name="title"
          onChange={formik.handleChange}
          placeholder="Title"
          type="text"
          value={formik.values.title}
        />
        {formik?.touched?.title && formik?.errors?.title ? (
          <ErrorText>{formik.errors.title}</ErrorText>
        ) : null}
        <SelectContainer>
          <Select
            captureMenuScroll={true}
            closeMenuOnSelect={false}
            components={animatedComponents}
            id="category_id"
            isMulti={true}
            menuPlacement="auto"
            menuPosition="fixed"
            name="category_id"
            onChange={(category_id) => formik.setFieldValue('category_id', category_id)}
            options={options}
            placeholder="Select Categories"
            value={formik.values.category_id}
          />
          {formik.touched.category_id && formik.errors.category_id ? (
            <ErrorText>{formik.errors.category_id}</ErrorText>
          ) : null}
        </SelectContainer>
        <Input
          error={formik?.touched?.description && formik?.errors?.description}
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
        <Container>
          {(formik?.values?.attachment?.imageURL || formik?.values?.attachment) && (
          <img 
            alt='Add Image'
            src={formik.values.attachment?.imageURL || formik.values.attachment}
            style={{
              height: "200px",
              width: "300px"
            }}
          />
          )}
        </Container>
        <Input
          accept="image/jpeg, image/png, image/jpg, image/gif, image/svg+xml"
          error={formik?.touched?.attachment && formik?.errors?.attachment}
          id="attachment"
          name="attachment"
          onChange={(event) => formik.setFieldValue('attachment', { imageURL: URL?.createObjectURL(event?.target?.files[0]), file: event?.target?.files[0] })}
          placeholder="Attachment"
          type="file"
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
