import React from 'react'
import BlogOperation from './BlogOperation'
import Navbar from '../../../components/Navbar'
import HeaderComponent from '../../../components/Header'
import { useParams } from 'react-router-dom'
// import PropTypes from 'prop-types'

function BlogOpsIndex() {
  const { blogId } = useParams()

  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading={blogId ? 'Edit Blog' : 'Add Blog'}
      />
      <BlogOperation
        blogId={blogId}
      />
    </div>
  )
}

BlogOpsIndex.propTypes = {

}

export default BlogOpsIndex

