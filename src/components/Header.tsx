import React from 'react'
import { Navbar } from 'react-bootstrap'

type Props = {}

const Header = (props: Props) => {
  return (
    <Navbar bg='primary' variant='dark' className='header'>
      <Navbar.Brand className='header_brand'>
        Paint Online [Fun]
      </Navbar.Brand>
    </Navbar>
  )
}

export default Header