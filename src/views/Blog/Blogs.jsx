import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteButton, EditButton, Table, Td, Th, Button, ButtonContainer, DataNotFound } from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { getBlogs } from '../../redux/actions/blog'
// import PropTypes from 'prop-types'

function Blogs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogss = useSelector(state => state.blog.blogList)
  console.log('blogss :>> ', blogss);
  const blogs = [
   ]

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  const onDelete = (id) => {
    console.log('id :>> ', id);
  }

  return (
    <>
      <ButtonContainer moreButton={true} >
        <Button onClick={() => navigate('/categories')}>Categories</Button>
        <Button onClick={() => navigate('/blogs/add-blog')}>Add Blog</Button>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <Th>Author Name</Th>
            <Th>Category</Th>
            <Th>Task Date</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map(blog => (
            <tr key={blog?.id}>
              <Td>{blog?.name}</Td>
              <Td>{blog?.category}</Td>
              <Td>{blog?.date}</Td>
              <Td>
                <EditButton onClick={() => navigate(`/blogs/update-blog/${blog.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(blog.id)}>Delete</DeleteButton>
              </Td>
            </tr>
          ))}
          {blogs?.length === 0 && (
            <DataNotFound>
              Data not available
            </DataNotFound>
          )}
        </tbody>
      </Table>
    </>
  )
}

Blogs.propTypes = {

}

export default Blogs

