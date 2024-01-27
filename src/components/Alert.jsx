import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AlertWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${(props) => (props.success ? 'green' : 'red')};
  color: #ffffff;
  padding: 15px 50px 15px 20px;
  border: ${(props) => (props.success ? '1px solid green' : '1px solid red')};
  border-radius: 5px;
`

const CloseIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 18px;
  font-weight: bold;
`

function AlertComponent (props) {
  const { success, message, setAlert } = props

  return (
    <AlertWrapper success={success}>
      <CloseIcon onClick={() => setAlert(false)}>&times;</CloseIcon>
      {message}
    </AlertWrapper>
  )
}

AlertComponent.propTypes = {
  success: PropTypes.func,
  message: PropTypes.string,
  setAlert: PropTypes.func
}

export default AlertComponent
