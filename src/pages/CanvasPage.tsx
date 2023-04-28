//@ts-nocheck
import  { useCallback, useEffect, useRef, useState } from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'
import UserList from '../components/UserList'
import Rounds from '../components/Rounds'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Timer from '../components/Timer'
import { useAppSelector } from '../store/hooks'
import { IMessage } from '../models/message'
import { Button, Modal } from 'react-bootstrap'
import '../styles/canvas.scss'
import { IElement } from '../modes/Mode'
import ProcessElementFW from '../components/ProcessElementFW'

type Props = {}

const CanvasPage = (props: Props) => {
  const {round} = useParams()
  const {mode} = useAppSelector(state => state.modesSlice)
  const nav = useNavigate()
  const {id, username, socket} = useAppSelector(state => state.canvasSlice)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [show, setShow] = useState(true)
  const [element, setElement] = useState<IElement | null>(null)
  const [time, setTime] = useState(mode?.rounds[+round!].time!)

 
  const timerHandler = useCallback(async () => {
      if (+round! + 1 < mode?.roundsCount!) {
        const msg: IMessage = {
          id,
          username,
          method: 'finish',
          path: `/${mode?.rounds[+round! + 1].type}/${+round! + 1}`,
          image: canvasRef.current?.toDataURL(),
          round: +round!
        }
        socket?.send(JSON.stringify(msg))
      }
      else {
        const msg: IMessage = {
          id,
          username,
          method: 'finish',
          path: `/finish/` + id, 
          image: canvasRef.current?.toDataURL(),
          round: +round!
        }
        socket?.send(JSON.stringify(msg))
      }
  }, [+round!])

  useEffect(() => {
    const el = mode?.getClassElement(+round!, 'draw')
    setElement(el!)
  }, [+round!])

  useEffect(() => {
    setShow(true)
    setTime(mode?.rounds[+round!].time!)
  } , [round])

 

  return (
    <div className='app'>
      <Rounds round={+round!} allRounds={mode?.roundsCount!}/>
      <Timer allTime={time} callback={timerHandler} round={+round!}/> 
      <ToolBar/>
      <Canvas canvasRef={canvasRef}/>
      <Settings/>
      <Modal show={show}>
        <Modal.Header>Paint it</Modal.Header>
        <Modal.Body>
          <ProcessElementFW element={element!}/>
        </Modal.Body>
        <Modal.Header>
          <Button onClick={() => setShow(false)}>Quit</Button>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default CanvasPage