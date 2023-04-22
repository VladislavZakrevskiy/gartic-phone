import {useEffect, useRef} from 'react'
import '../styles/canvas.scss'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCanvas, setUndoRedo } from '../store/reducers/canvasSlice'
import undoRedo from '../tools/UndoRedo'
import {useParams} from 'react-router-dom'


const Canvas = () => {
  const dispatch = useAppDispatch()
  const canvasRef = useRef(null)
  const {socket} = useAppSelector(state => state.canvasSlice)
  const {id} = useParams()


  useEffect(() => {
    dispatch(setCanvas(canvasRef.current))
    //@ts-ignore
    dispatch(setUndoRedo(new undoRedo(canvasRef.current, socket, id, dispatch)))
  }, [])

  return (
    <div className='canvas'> 
        <canvas ref={canvasRef} width={600} height={400}
        />
    </div>
  )
}

export default Canvas

