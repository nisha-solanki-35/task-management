import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { Button, Container, ErrorText, Form, FormContainer, Input } from '../../components/FormComponent'
import { register } from '../../redux/actions/auth'
import { useNavigate } from 'react-router-dom'

const validate = values => {
  const requiredFields = ['first_name', 'last_name', 'city', 'phone', 'email', 'profile_image']
  const errors = {}
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required field'
    }
  })
  return errors
}

function Register () {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userData = useSelector(state => state.auth.userData)
  const successMessage = useSelector(state => state.auth.successMessage)
  const errorMessage = useSelector(state => state.auth.errorMessage)

  useEffect(() => {
    if (successMessage) {
      navigate('/dashboard/profile', {
        state: { message: successMessage + ' Your temporary Password is ' + userData?.your_password }
      })
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      formik.setErrors(errorMessage)
    }
  }, [errorMessage])

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      city: '',
      phone: '',
      email: '',
      profile_image: '',
    },
    validate,
    onSubmit: (values) => {
      dispatch(register(values))
    }
  })

  console.log('formik :>> ', formik);

  return (
    <FormContainer>
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
        <Container>
          <img 
            src={formik.values.profile_image?.imageURL || formik.values.profile_image}
            style={{
              height: "200px",
              width: "300px"
            }}
          />
        </Container>
        <Input
          accept="image/jpeg, image/png, image/jpg, image/gif, image/svg+xml"
          error={formik.touched.profile_image && formik.errors.profile_image}
          id="profile_image"
          name="profile_image"
          onChange={(event) => formik.setFieldValue('profile_image', { imageURL: URL?.createObjectURL(event?.target?.files[0]), file: event?.target?.files[0] })}
          type="file"
        />
        {formik.touched.profile_image && formik.errors.profile_image ? (
          <ErrorText>{formik.errors.profile_image}</ErrorText>
        ) : null}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  )
}

export default Register
