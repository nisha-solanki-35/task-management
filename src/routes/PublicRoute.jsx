import React, { Suspense } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import PropTypes from 'prop-types'

function PublicRoute ({ element: Component }) {
  const token = localStorage.getItem('Token')
  const { pathname } = useLocation()

  if (token) {
    return (
      <Navigate to={
        pathname === '/' ||
        pathname === '/sign-in' ||
        pathname === '/sign-up'
          ? '/dashboard/profile'
          : pathname}
      />
    )
  }
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  )
}

PublicRoute.propTypes = {
  element: PropTypes.object
}

export default PublicRoute
