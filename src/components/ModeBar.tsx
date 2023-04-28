//@ts-nocheck
import { useState } from 'react'
import '../styles/modes.scss'
import Mode from './Mode'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setMode } from '../store/reducers/modesSlice'
import { Classic } from '../modes/Classic'
import { Plagiarism } from '../modes/Plagiarism'
import { Icebreaker } from '../modes/Icebreaker'
import { Express } from '../modes/Express'
import { Sandwich } from '../modes/Sandwich'
import { useNavigate } from 'react-router-dom'
import { Mode as ModeClass } from '../modes/Mode';
import Timer from './secondTimer';
import { IMessage } from '../models/message'


const ModeBar = () => {
  const {socket, id, username} = useAppSelector(state => state.canvasSlice)
  const {users} = useAppSelector(state => state.userSlice)
  const {mode} = useAppSelector(state => state.modesSlice)
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [show, setShow] = useState(false)

  const modeHandler = (mode: ModeClass) => {
    dispatch(setMode(mode))
    setShow(true)
    console.log(mode)
  }

  const timerHandler = () => { 
    nav('/writeRound/0')
    const msg: IMessage = {
      id: id,
      username: username, 
      method: 'start',
      //@ts-ignore
      mode: mode?.__proto__?.constructor?.name,
      users: users
    }
    socket?.send(JSON.stringify(msg))
    setShow(false)
  }


  return (
        <div className='modes'>
        <Mode 
          main='Classic ' 
          click={() => modeHandler(new Classic(socket!, users, username!))}/>
        {/*  */}
        <Mode 
          main='KnockOff ' 
          click={() => modeHandler(new Plagiarism(socket!, users, username!))}/>
          {/*  */}
        <Mode 
          main='Icebreaker ' 
          click={() => modeHandler(new Icebreaker(socket!, users, username!))}/>
          {/*  */}
        <Mode 
          main='Speedrun ' 
          click={() => modeHandler(new Express(socket!, users, username!))}/>
          {/*  */}
        <Mode 
          main='Sandwich ' 
          click={() => modeHandler(new Sandwich(socket!, users, username!))}/>
          {/*  */}
        <Timer show={show} handler={timerHandler}/>
      </div>
  )
      
}

export default ModeBar