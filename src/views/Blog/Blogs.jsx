import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteButton, EditButton, Table, Td, Th, Button, ButtonContainer, DataNotFound } from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { getBlogs } from '../../redux/actions/blog'
import moment from 'moment'
// import PropTypes from 'prop-types'

function Blogs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog.blogList)


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
            <Th>Id</Th>
            <Th>Author Name</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Task Date</Th>
            <Th>Attachment</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {blogs?.data?.map(blog => (
            <tr key={blog?.id}>
              <Td>{blog?.id || '--'}</Td>
              <Td>{blog?.user_detail?.first_name + blog?.user_detail?.last_name|| '--'}</Td>
              <Td>{blog?.title || '--'}</Td>
              <Td>{blog?.category?.length > 0 ? blog?.category?.toString() : '--'}</Td>
              <Td>{moment(blog?.created_at).format('LLL')}</Td>
              <Td>
                <img 
                  src={blog?.attachment}
                  style={{
                    height: "45px",
                    width: "60px",
                  }}
                />
              </Td>
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

