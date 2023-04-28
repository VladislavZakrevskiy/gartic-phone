import React, { ChangeEvent } from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch } from '../store/hooks'
import { setFillColor, setLineWidth, setStrokeColor } from '../store/reducers/toolSlice'
import { FormControl, FormLabel } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange'

type Props = {}

const Settings = (props: Props) => {
  const dispatch = useAppDispatch()

  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFillColor(e.target.value))
    dispatch(setStrokeColor(e.target.value))
  }


  return (
    <div className='settings'>
        <FormLabel htmlFor='line'>Linewidth</FormLabel>
        <FormRange  
          onChange={(e)=> dispatch(setLineWidth(e.target.value))}
          style={{margin: '0 10px'}} 
          id='line' 
          defaultValue={1} 
          min={1} 
          max={100}/>
        <FormLabel htmlFor='stroke'>Stroke Color</FormLabel>
        <FormControl 
          onChange={(e)=> dispatch(setStrokeColor(e.target.value))}
          style={{margin: '0 10px'}} 
          id='line' 
          className='settings_btn'
          type="color" />
        <FormLabel htmlFor='stroke'>Fill Color</FormLabel>
        <FormControl 
          type='color' 
          className='settings_btn'
          onChange={changeColor}
          />
    </div>
  )
}

export default Settings