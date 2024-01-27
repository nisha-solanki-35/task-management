import React, { lazy, Suspense } from 'react'
import Loader from '../../components/Loader'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
const Login = lazy(() => import('./Login'))
import styled from 'styled-components'

const StyledLink = styled.div({
  textAlign: 'center',
  margin: '15px 0'
})

function LoginIndex () {
  return (
    <>
      <Header
        heading='Sign-in'
      />
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
      <StyledLink>
        {'Don\'t have an account?'}
        {' '}
        <Link to='/sign-up'>
          Sign up
        </Link>
      </StyledLink>
    </>
  )
}

export default LoginIndex
