import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Button, ErrorText, Form, FormContainer, Input } from '../../components/FormComponent'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/auth'
import AlertComponent from '../../components/Alert'
import { useNavigate } from 'react-router-dom'

const validate = values => {
  const requiredFields = ['email', 'password']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const successMessage = useSelector(state => state.auth.successMessage)
  const errorMessage = useSelector(state => state.auth.errorMessage)

  useEffect(() => {
    if (successMessage) {
      navigate('/dashboard/profile', {
        state: { message: successMessage }
      })
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
    }
  }, [errorMessage])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      console.log('Form values:', values)
      dispatch(login(values))
    },
  })

  return (
    <FormContainer>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.email && formik.errors.email}
          id="email"
          name="email"
          onChange={formik.handleChange}
          placeholder="Email"
          type="email"
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorText>{formik.errors.email}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.password && formik.errors.password}
          id="password"
          name="password"
          onChange={formik.handleChange}
          placeholder="Password"
          type="password"
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorText>{formik.errors.password}</ErrorText>
        ) : null}
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  )
}

export default Login
