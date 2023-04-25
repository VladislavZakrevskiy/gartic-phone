import { useState } from 'react'
import '../styles/modes.scss'
import Mode from './Mode'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setMode } from '../store/reducers/modesSlice'
import { Classic } from '../modes/Classic'
import { Plagiarism } from '../modes/Plagiarism'
import { Secret } from '../modes/Secret'
import { Icebreaker } from '../modes/Icebreaker'
import { Express } from '../modes/Express'
import { Sandwich } from '../modes/Sandwich'
import { Crowd } from '../modes/Crowd'
import { useNavigate } from 'react-router-dom'
import { Mode as ModeClass } from '../modes/Mode';
import Timer from './secondTimer';
import { IMessage } from '../models/message'
import { FormText } from 'react-bootstrap'


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
    nav('/writeRound?round=0')
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
        {/* 12 модов макс */}
        <Mode 
          main='Classic' 
          additionally='' 
          click={() => modeHandler(new Classic(socket!, users, username!))}/>
        {/* Basic mode! Alternately write and draw until you run out of moves! */}
        <Mode 
          main='Plagiarism' 
          additionally='' 
          click={() => modeHandler(new Plagiarism(socket!, users, username!))}/>
        <Mode 
          main='Secret' 
          additionally='' 
          click={() => dispatch(setMode(new Secret(socket!, users, username!)))}/>
        <Mode 
          main='Icebreaker' 
          additionally='' 
          click={() => dispatch(setMode(new Icebreaker(socket!, users, username!)))}/>
        <Mode 
          main='Express' 
          additionally='' 
          click={() => modeHandler(new Express(socket!, users, username!))}/>
        <Mode 
          main='Sandwich' 
          additionally='' 
          click={() => dispatch(setMode(new Sandwich(socket!, users, username!)))}/>
        <Mode 
          main='Crowd' 
          additionally='' 
          click={() => dispatch(setMode(new  Crowd(socket!, users, username!)))}/>
        <Timer show={show} handler={timerHandler}/>
      </div>
  )
      
}

export default ModeBar