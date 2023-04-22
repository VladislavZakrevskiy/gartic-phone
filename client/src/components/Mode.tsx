import React from 'react'
import '../styles/modes.scss'

interface ModeProps {
    main: string
    additionally: string
    click: () => void
}

const Mode = ({main, additionally, click}: ModeProps) => {
  return (
    <div className='modes-item' onClick={click}>
        <div className="modes-item-header">
            {main}
        </div>
        <div className="modes-item-content">
            {additionally}
        </div>
    </div>
  )
}

export default Mode