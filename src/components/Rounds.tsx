import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import '../styles/modes.scss'

interface IRoundsProps {
  round: number
  allRounds: number
}

const Rounds = ({round, allRounds}: IRoundsProps) => {

  return (
    <div className='rounds'>
        {round + 1}/{allRounds}
    </div>
  )
}

export default Rounds