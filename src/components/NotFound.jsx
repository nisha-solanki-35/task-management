import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function NotFound () {
  return (
    <StyledLink>
      <h2>404 | This page could not be found.</h2>
      <Link
        to='/dashboard/profile'
      >
        Go back to dashboard
      </Link>
    </StyledLink>
  )
}

export default NotFound
