//@ts-nocheck
import React from 'react'
import Timer from './Timer'
import '../styles/modes.scss'

interface ISecTimerProps {
    show: boolean
    handler: () => void
}

const secondTimer = ({show, handler}: ISecTimerProps) => {
    if(show) {
        return (
            <Timer allTime={3000} callback={handler} classTimer='center-timer'/>
        )
    }
    return null
  
}

export default secondTimer