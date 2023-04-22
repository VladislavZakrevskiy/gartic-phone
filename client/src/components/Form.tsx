import React from 'react'
import { Form } from 'react-bootstrap'

interface IFormComponentProps {
    text?: string | undefined
}

const FormComponent = ({text}: IFormComponentProps) => {

  return (
    <Form>
        <Form.Label htmlFor='form-input'>
        {
            text ? 
            text : 'Введите предложение для друзей'
        }
        </Form.Label>
        <Form.Control
            id='form-input'
        />
    </Form>
  )
}

export default FormComponent