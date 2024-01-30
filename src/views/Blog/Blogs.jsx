import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DeleteButton, EditButton, Table, Td, Th, Button, ButtonContainer, DataNotFound } from '../../components/Table'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteBlog, getBlogs } from '../../redux/actions/blog'
import moment from 'moment'
import AlertComponent from '../../components/Alert'
import { CardContainer, CardContent, CardFooter, CardTitle, CardView, Content, StyledSelect } from '../../components/FormComponent'
import { getCategories } from '../../redux/actions/category'
// import PropTypes from 'prop-types'

function Blogs() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blog.blogList)
  const successMessage = useSelector(state => state.blog.successMessage)
  const errorMessage = useSelector(state => state.blog.errorMessage)
  const categories = useSelector(state => state.category.categoryList)
  
  const [isBlogView, setIsBlogView] = useState(false)
  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('')
  const [user, setUser] = useState('')
  const [userArr, setUserArr] = useState([])
  const previousProps = useRef({ category, user }).current
  console.log('userArr', userArr)

  useEffect(() => {
    dispatch(getBlogs(category, user))
    dispatch(getCategories())
    if (state?.message) {
      setMessage(state?.message)
      setAlert(true)
      setSuccess(true)
    }
  }, [])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage)
      setAlert(true)
      setSuccess(true)
      dispatch(getBlogs(category, user))
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
      dispatch(getBlogs(category, user))
    }
  }, [errorMessage])

  useEffect(() => {
    if (previousProps.category !== category) {
      dispatch(getBlogs(category, user))
    }
    return () => {
      previousProps.category = category
    }
  }, [category])

  useEffect(() => {
    if (previousProps.user !== user) {
      dispatch(getBlogs(category, user))
    }
    return () => {
      previousProps.user = user
    }
  }, [user])

  useEffect(() => {
    if (blogs?.data?.length > 0 && userArr?.length === 0) {
      const userArr = []
      blogs?.data?.map(data => {
        const userData = {
          id: data?.user_detail?.id,
          name: data?.user_detail?.first_name + ' ' + data?.user_detail?.last_name
        }
        const userIds = userArr?.map(d => d?.id)
        console.log('userIds', userIds)
        if (!userIds?.includes(userData?.id)) userArr.push(userData)
        return userArr
      })
      setUserArr(userArr)
    }
  }, [blogs])

  const onDelete = (id) => {
    dispatch(deleteBlog(id))
  }

  const handleOnChange = (event, type) => {
    if (type === 'C') setCategory(event.target.value)
    else if (type === 'U') setUser(event.target.value)
  }

  return (
    <>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <ButtonContainer moreButton={true} >
        <Button onClick={() => navigate('/categories')}>Categories</Button>
        <Button onClick={() => setIsBlogView(!isBlogView)}>{isBlogView ? 'List View' : 'Card View'}</Button>
        <Button onClick={() => navigate('/blogs/add-blog')}>Add Blog</Button>
      </ButtonContainer>
      {!isBlogView && (
      <Table>
        <thead>
          <tr>
            <Th>Id</Th>
            <Th>
              User Name
              <StyledSelect onChange={(e) => handleOnChange(e, 'U')}>
                <option value='' >Select</option>
                {userArr?.map((data) => 
                  <option key={data?.id} value={data?.id}>{data?.name}</option>)}
              </StyledSelect>
            </Th>
            <Th>Title</Th>
            <Th>
              Category
              <StyledSelect onChange={(e) => handleOnChange(e, 'C')}>
                <option value='' >Select</option>
                {categories?.data?.map((data) => 
                  <option key={data?.id} value={data?.id}>{data?.name}</option>)}
              </StyledSelect>
            </Th>
            <Th>Task Date</Th>
            <Th>Attachment</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {blogs?.data?.map(blog => (
            <tr key={blog?.id}>
              <Td>{blog?.id || '--'}</Td>
              <Td>{blog?.user_detail?.first_name + ' ' + blog?.user_detail?.last_name|| '--'}</Td>
              <Td>{blog?.title || '--'}</Td>
              <Td>{blog?.category?.length > 0 ? blog?.category?.map(data => data.name).toString() : '--'}</Td>
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
      )}
      {isBlogView &&
        (
        <CardView>
          {blogs?.data?.map((blog, index) => (
            <CardContainer key={index}>
              <CardTitle>
                Title:
                {' '}
                {blog?.title}
              </CardTitle>
              <CardContent>
                <Content>
                  <b>Author Name: </b>
                  {blog?.user_detail?.first_name + ' ' + blog?.user_detail?.last_name|| 'NA'}
                </Content>
                <Content>
                  <b>Categories: </b>
                  {blog?.category?.length > 0 ? blog?.category?.map(data => data.name).toString() : 'NA'}
                </Content>
                <Content>
                  <b>Date: </b>
                  {moment(blog?.created_at).format('LLL')}
                </Content>
                <Content>
                  <img 
                    src={blog?.attachment}
                    style={{
                    height: "150px",
                    width: "200px",
                  }}
                  />
                </Content>
              </CardContent>
              <CardFooter>
                <EditButton onClick={() => navigate(`/blogs/update-blog/${blog.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(blog.id)}>Delete</DeleteButton>
              </CardFooter>
            </CardContainer>
))}
        </CardView>
)}
    </>
  )
}

Blogs.propTypes = {

}

export default Blogs

