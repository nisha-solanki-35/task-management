import React from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'

const NavbarContainer = styled.div`
  background-color: #333;
  padding: 10px;
  color: #ffffff;
`

const NavItems = styled.div`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  color: white;
`

const NavItem = styled.div`
  color: ${(props) => (props.active ? '#89CFF0' : '#ffffff')};
  cursor: pointer;
  padding: 8px;
`

const Navbar = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <NavbarContainer>
      <NavItems>
        <NavItem active={pathname === '/dashboard/profile'} onClick={() => navigate('/dashboard/profile')}>Profile</NavItem>
        <NavItem active={pathname.includes('/blogs') || pathname.includes('/categories')} onClick={() => navigate('/blogs')}>Blogs</NavItem>
        <NavItem active={pathname.includes('/tasks')} onClick={() => navigate('/tasklist')}>Task List</NavItem>
      </NavItems>
    </NavbarContainer>
  )
}

export default Navbar;
