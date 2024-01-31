import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonContainer, DataNotFound, DeleteButton, EditButton, Table, Td, Th } from '../../components/Table'
import { useNavigate, useLocation } from 'react-router-dom'
import { deleteCategory, getCategories } from '../../redux/actions/category'
import moment from 'moment'
import AlertComponent from '../../components/Alert'
// import PropTypes from 'prop-types'

function Categories() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categoryList)
  const successMessage = useSelector(state => state.category.successMessage)
  const errorMessage = useSelector(state => state.category.errorMessage)

  const [alert, setAlert] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    dispatch(getCategories())
    if (state?.message) {
      setMessage(state?.message)
      setAlert(true)
      setSuccess(true)
    }
    window.history.replaceState({}, {})
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
      dispatch(getCategories())
    }
  }, [successMessage])

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage)
      setAlert(true)
      setSuccess(false)
      dispatch(getCategories())
    }
  }, [errorMessage])

  const onDelete = (id) => {
    dispatch(deleteCategory(id))
  }

  return (
    <>
      {alert && <AlertComponent message={message} setAlert={setAlert} success={success} />}
      <ButtonContainer>
        <Button onClick={() => navigate('/categories/add-category')}>Add Category</Button>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <Th>Category</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {categories?.data?.map(category => (
            <tr key={category?.id}>
              <Td>{category?.name}</Td>
              <Td>{moment(category?.created_at).format('LLL')}</Td>
              <Td>
                <EditButton onClick={() => navigate(`/categories/update-category/${category.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(category.id)}>Delete</DeleteButton>
              </Td>
            </tr>
        ))}
          {categories?.data?.length === 0 && (
          <DataNotFound>
            Data not available
          </DataNotFound>
        )}
        </tbody>
      </Table>
    </>
  )
}

Categories.propTypes = {

}

export default Categories

