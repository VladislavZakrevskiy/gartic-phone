import { useEffect, useState } from 'react'
import '../styles/modes.scss'

interface AppearElProps {
    time: number
    children: any
    className?: string
}

const AppeareElement = ({time, children, className}: AppearElProps) => {
    const [timer, setTimer] = useState(time / 1000)
    const [visible, setVisible] = useState<boolean>(false)
  
    useEffect(() => {
        if( timer > 0 ) { 
            let interval: number
            interval = setInterval(() => {
            setTimer(seconds => seconds - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        else {
            setVisible(true)
        }
      }, [timer]);


    if(visible) {
        return (
            <div className={'hidden ' + className}>
                {children}
            </div>
        )
    }
    return null
    
}

export default AppeareElement