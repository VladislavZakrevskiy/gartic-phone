import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import '../styles/modes.scss'

interface ITimerProps {
    allTime: number
    callback: () => void
    classTimer?: string
    round: number
}

const Timer = ({ allTime, callback, classTimer, round}: ITimerProps) => {
    const [timer, setTimer] = useState(allTime / 1000)

    useEffect(() => {
        setTimer(allTime / 1000)
    }, [round])
  
    useEffect(() => {
        if( timer > 0 ) { 
            const interval: any = setInterval(() => {
            setTimer(seconds => seconds - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        else {
            callback ? callback() : null
        }
      }, [timer]);

    return (
        <div className={classTimer ? classTimer : 'timer'}>
            {timer}
        </div>
    )
}

export default Timer