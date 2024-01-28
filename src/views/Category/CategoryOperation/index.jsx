import React from 'react'
import Navbar from '../../../components/Navbar'
import CategoryOperation from './CategoryOperation'
import HeaderComponent from '../../../components/Header'
import { useParams } from 'react-router-dom'

function CategoryOpsIndex() {
  const { categoryId } = useParams()

  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading={categoryId ? 'Edit Category' : 'Add Category'}
      />
      <CategoryOperation
        categoryId={categoryId}
      />
    </div>
  )
}

export default CategoryOpsIndex

