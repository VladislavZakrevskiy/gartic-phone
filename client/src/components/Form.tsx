import React from 'react'
import { Form } from 'react-bootstrap'

interface IFormComponentProps {
    text?: string | undefined
    value: string
    setValue: (value: string) => void
}

const FormComponent = ({text, setValue, value}: IFormComponentProps) => {

  return (
    <Form>
        
    </Form>
  )
}

export default FormComponent