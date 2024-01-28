import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, ErrorText, Form, FormContainer, Input } from '../../../components/FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getCategoryDetails, updateCategory } from '../../../redux/actions/category'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../../../components/Alert'
import PropTypes from 'prop-types'

const validate = values => {
  const requiredFields = ['name']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

function CategoryOperation (props) {
  const { categoryId } = props
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const categoryDetails = useSelector(state => state.category.categoryDetails)
  const successMessage = useSelector(state => state.category.successMessage)
  const errorMessage = useSelector(state => state.category.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetails(categoryId))
    }
  }, [])

  useEffect(() => {
    if (successMessage) {
      if (categoryId) {
        setMessage(successMessage)
        setAlert(true)
        setSuccess(true)
      } else {
        navigate('/categories', {
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
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: values => {
      if (categoryId) {
        dispatch(updateCategory(values, categoryId))
      } else {
        dispatch(addCategory(values))
      }
    }
  })

  useEffect(() => {
    if (categoryDetails) {
      formik.setValues({
        name: categoryDetails?.name || '',
      })
    }
  }, [categoryDetails])

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.name && formik.errors.name}
          id="name"
          name="name"
          onChange={formik.handleChange}
          placeholder="Category Name"
          type="name"
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorText>{formik.errors.name}</ErrorText>
        ) : null}
        <Button type="submit">{categoryId ? 'Save changes' : 'Add Category'}</Button>
      </Form>
    </FormContainer>
  )
}

CategoryOperation.propTypes = {
  categoryId: PropTypes.string
}

export default CategoryOperation
