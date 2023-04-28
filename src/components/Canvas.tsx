//@ts-nocheck
import React, {useEffect, useRef} from 'react'
import '../styles/canvas.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCanvas, setUndoRedo } from '../store/reducers/canvasSlice'
import undoRedo from '../tools/UndoRedo'
import {useParams} from 'react-router-dom'

interface ICanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
}

const Canvas = ({canvasRef}: ICanvasProps) => {
  const dispatch = useAppDispatch()
  const {socket, tool} = useAppSelector(state => state.canvasSlice)
  const {id} = useParams()


  useEffect(() => {
    console.log(canvasRef.current)
    dispatch(setCanvas(canvasRef.current))
    //@ts-ignore
    dispatch(setUndoRedo(new undoRedo(canvasRef.current, socket, id, dispatch)))
  }, [])

  const mouseDownHandler = () => {
    //@ts-ignore
    tool?.pushUndo(canvasRef.current.toDataURL())
  }

  return (
    <div className='canvas'> 
        <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={600} height={400}
        />
    </div>
  )
}

export default Canvas

