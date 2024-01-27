import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, ErrorText, Form, FormContainer, Input } from '../../components/FormComponent'
import { register } from '../../redux/actions/auth'
import AlertComponent from '../../components/Alert'
import { getUserDetails } from '../../redux/actions/user'
import styled from 'styled-components'

const UserHeading = styled.h3`
  text-align: center;
`

const validate = values => {
  const requiredFields = ['first_name', 'last_name', 'city', 'phone', 'email', 'password']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

function Profile () {
  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.user.userDetails)
  const successMessage = useSelector(state => state.user.successMessage)
  const errorMessage = useSelector(state => state.user.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getUserDetails())
  }, [])

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage)
      setAlert(true)
      setSuccess(true)
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
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      city: userDetails?.city,
      phone: userDetails?.phone,
      email: userDetails?.email,
      // profile_image: userDetails?.profile_image,
      password: userDetails?.password
    },
    validate,
    onSubmit: (values) => {
      console.log("values", values)
      dispatch(register(values))
    }
  })

  return (
    <FormContainer>
      <UserHeading>
        Welcome 
        {userDetails?.first_name}
      </UserHeading>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <Form onSubmit={formik.handleSubmit}>
        <Input
          error={formik.touched.first_name && formik.errors.first_name}
          id="first_name"
          name="first_name"
          onChange={formik.handleChange}
          placeholder="First Name"
          type="text"
          value={formik.values.first_name}
        />
        {formik.touched.first_name && formik.errors.first_name ? (
          <ErrorText>{formik.errors.first_name}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.last_name && formik.errors.last_name}
          id="last_name"
          name="last_name"
          onChange={formik.handleChange}
          placeholder="Last Name"
          type="text"
          value={formik.values.last_name}
        />
        {formik.touched.last_name && formik.errors.last_name ? (
          <ErrorText>{formik.errors.last_name}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.city && formik.errors.city}
          id="city"
          name="city"
          onChange={formik.handleChange}
          placeholder="City"
          type="text"
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? (
          <ErrorText>{formik.errors.city}</ErrorText>
        ) : null}
        <Input
          error={formik.touched.phone && formik.errors.phone}
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          placeholder="Contact"
          type="text"
          value={formik.values.phone}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <ErrorText>{formik.errors.phone}</ErrorText>
        ) : null}
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
        <Button type="submit">Update Profile</Button>
      </Form>
    </FormContainer>
  )
}

export default Profile
