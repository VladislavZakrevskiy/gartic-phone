import  { useCallback, useRef, useState } from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'
import UserList from '../components/UserList'
import Rounds from '../components/Rounds'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Timer from '../components/Timer'
import { useAppSelector } from '../store/hooks'
import { IMessage } from '../models/message'
import { Button, Modal } from 'react-bootstrap'
import Sentences from '../components/Sentences'
import '../styles/canvas.scss'

type Props = {}

const CanvasPage = (props: Props) => {
  const [params, setParams] = useSearchParams()
  const round = params.get('round')
  const {mode} = useAppSelector(state => state.modesSlice)
  const nav = useNavigate()
  const {id, username, socket} = useAppSelector(state => state.canvasSlice)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [show, setShow] = useState(true)

 
  const timerHandler = useCallback(async () => {
      if (+round! + 1 < mode?.roundsCount!) {
        const msg: IMessage = {
          id,
          username,
          method: 'finish',
          path: `/${mode?.rounds[+round! + 1].type}/?round=${+round! + 1}`,
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
  }, [])

 

  return (
    <div className='app'>
      <Rounds round={+round!} allRounds={mode?.roundsCount!}/>
      <Timer allTime={mode?.rounds[+round!].time!} callback={timerHandler}/> 
      <ToolBar/>
      <Canvas canvasRef={canvasRef}/>
      <Settings/>
      <Modal show={show}>
        <Modal.Header>Paint it</Modal.Header>
        <Modal.Body>
          <Sentences round={+round! - 1} usernames={
          [
            mode?.rounds[+round! - 1].players[mode.currentPlayerNumber].username!,
          ]} id={id!}/> 
        </Modal.Body>
        <Modal.Header>
          <Button onClick={() => setShow(false)}>Quit</Button>
        </Modal.Header>
      </Modal>
    </div>
  )
}

export default CanvasPage