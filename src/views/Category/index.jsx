import React from 'react'
import Navbar from '../../components/Navbar'
import Categories from './Categories'
import HeaderComponent from '../../components/Header'
// import PropTypes from 'prop-types'

function CategoriesIndex() {
  return (
    <div>
      <Navbar />
      <HeaderComponent
        heading='Categories'
      />
      <Categories />
    </div>
  )
}

CategoriesIndex.propTypes = {

}

export default CategoriesIndex

