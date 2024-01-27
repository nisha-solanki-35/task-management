import React, { lazy, Suspense } from 'react'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
const Register = lazy(() => import('./Register'))
import styled from 'styled-components'

const StyledLink = styled.div({
  textAlign: 'center',
  margin: '15px 0'
})

function RegisterIndex () {
  return (
    <>
      <Header
        heading='Sign-up'
      />
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
      <StyledLink>
        Already have an account?
        {' '}
        <Link to='/sign-in'>
          Sign in
        </Link>
      </StyledLink>
    </>
  )
}

export default RegisterIndex
