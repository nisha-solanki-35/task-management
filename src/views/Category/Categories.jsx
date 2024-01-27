import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, ButtonContainer, DataNotFound, DeleteButton, EditButton, Table, Td, Th } from '../../components/Table'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../redux/actions/category'
// import PropTypes from 'prop-types'

function Categories() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categoryList)

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const onDelete = (id) => {
    console.log('id :>> ', id);
  }
  console.log('categories :>> ', categories);

  return (
    <>
      <ButtonContainer>
        <Button onClick={() => navigate('/categories/add-category')}>Add Category</Button>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <Th>Category</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {categories?.map(category => (
            <tr key={category?.id}>
              <Td>{category?.name}</Td>
              <Td>
                <EditButton onClick={() => navigate(`/categories/update-category/${category.id}`)}>Edit</EditButton>
                <DeleteButton onClick={() => onDelete(category.id)}>Delete</DeleteButton>
              </Td>
            </tr>
        ))}
          {categories?.length === 0 && (
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

