import React, { useState } from 'react'
import { setUsername } from '../store/reducers/canvasSlice'
import { useAppDispatch } from '../store/hooks'
import { Modal, Button, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const ModalComponent = () => {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [show, setShow] = useState(true)
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const connectionHandler = () => {
        dispatch(setUsername(name))
        if(code) {
          nav('/'+code)
        }
        setShow(false)
      }

  return (
    <Modal show={show} >
        <Modal.Header>
          <Modal.Title>Введите имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Name'/>
          <FormControl style={{marginTop: 10}} type='text' value={code} onChange={e => setCode(e.target.value)} placeholder='Room Code'/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent