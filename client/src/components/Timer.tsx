import React, { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../store/hooks'
import '../styles/modes.scss'

interface ITimerProps {
    allTime: number
    callback: () => void
}

const Timer = ({ allTime, callback}: ITimerProps) => {
    const [timer, setTimer] = useState(allTime / 1000)

    useEffect(() => {
        if( timer > 0 ) { 
            let interval: number
            interval = setInterval(() => {
            setTimer(seconds => seconds - 1);
            }, 1000);
            console.log(timer)
            return () => clearInterval(interval);
        }
        else {
            callback()
        }
      }, [timer]);

    return (
        <div className='timer'>
            {timer}
        </div>
    )
}

export default Timer