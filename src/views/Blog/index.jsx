import React from 'react'
import Navbar from '../../components/Navbar'
import Blogs from './Blogs'
import HeaderComponent from '../../components/Header'
// import PropTypes from 'prop-types'

function BlogsIndex() {
  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading='Blogs'
      />
      <Blogs />
    </div>
  )
}

BlogsIndex.propTypes = {

}

export default BlogsIndex

