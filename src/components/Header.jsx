import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Header = styled.h2`
  text-align: center;
`;

function HeaderComponent(props) {
  const { heading } = props

  return (
    <Header>
      {heading}
    </Header>
  )
}

HeaderComponent.propTypes = {
  heading: PropTypes.string
}

export default HeaderComponent

