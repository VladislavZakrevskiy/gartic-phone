import React from 'react'
import '../styles/modes.scss'

interface ModeProps {
    main: string
    click: () => void
}

const Mode = ({main, click}: ModeProps) => {
  return (
    <div className='modes-item' onClick={click}>
      {main}
    </div>
  )
}

export default Mode