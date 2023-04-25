//@ts-nocheck
import  { ChangeEvent } from 'react'
import '../styles/toolbar.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setFillColor, setStrokeColor, setTool } from '../store/reducers/toolSlice'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Eraser from '../tools/Eraser'
import Circle from '../tools/Circle'
import Line from '../tools/Line'
import { Button } from 'react-bootstrap'


const ToolBar = () => {
  const dispatch = useAppDispatch()
  const {canvas, tool, id, socket} = useAppSelector(state => state.canvasSlice)

  const save = () => {
    const dataURL = canvas?.toDataURL()
    const a = document.createElement('a')
    a.href = dataURL
    a.download = id + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className='toolbar'>
        <Button 
          className='toolbar_btn brush' 
          onClick={(() => dispatch(setTool(new Brush(canvas, socket, id, tool))))}>Brush</Button>
        <Button 
          className='toolbar_btn rect'
          onClick={() => dispatch(setTool(new Rect(canvas, socket, id, tool)))}
          >Rect</Button>
        <Button 
          className='toolbar_btn circle'
          onClick={() => dispatch(setTool(new Circle(canvas, socket, id, tool)))}
          >Circle</Button>
        <Button 
          className='toolbar_btn eraser'
          onClick={() => dispatch(setTool(new Eraser(canvas, socket, id, tool)))}
          >Eraser</Button>
        <Button 
          className='toolbar_btn line'
          onClick={() => dispatch(setTool(new Line(canvas, socket, id, tool)))}
          >Line</Button>
        <Button 
          className='toolbar_btn save'
          onClick={save}
          >Save</Button>
        <Button 
          className='toolbar_btn undo'
          onClick={() => tool?.undo()}
          >{`<--`}</Button>
        <Button 
          className='toolbar_btn redo'
          onClick={() => tool?.redo()}
          >{`-->`}</Button>
      </div>
  )
}

export default ToolBar