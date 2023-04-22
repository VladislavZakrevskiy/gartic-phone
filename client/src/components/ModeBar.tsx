import React from 'react'
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
import Timer from './Timer'
import { useNavigate } from 'react-router-dom'
import { Mode as ModeClass } from '../modes/Mode';


const ModeBar = () => {
  const {socket} = useAppSelector(state => state.canvasSlice)
  const {users} = useAppSelector(state => state.userSlice)
  const dispatch = useAppDispatch()
  const nav = useNavigate()

  const modeHandler = (mode: ModeClass) => {
    dispatch(setMode(mode))
    nav('/writeRound/?round=0')
  }


  return (
    <div className='modes'>
      {/* 12 модов макс */}
      <Mode main='Classic' additionally='' click={() => modeHandler(new Classic(socket!, users))}/>
      {/* Basic mode! Alternately write and draw until you run out of moves! */}
      <Mode main='Plagiarism' additionally='' click={() => dispatch(setMode(new Plagiarism(socket!, users)))}/>
      <Mode main='Secret' additionally='' click={() => dispatch(setMode(new Secret(socket!, users)))}/>
      <Mode main='Icebreaker' additionally='' click={() => dispatch(setMode(new Icebreaker(socket!, users)))}/>
      <Mode main='Express' additionally='' click={() => dispatch(setMode(new Express(socket!, users)))}/>
      <Mode main='Sandwich' additionally='' click={() => dispatch(setMode(new Sandwich(socket!, users)))}/>
      <Mode main='Crowd' additionally='' click={() => dispatch(setMode(new  Crowd(socket!, users)))}/>
    </div>
  )
}

export default ModeBar