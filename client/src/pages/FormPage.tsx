import React, { useCallback, useState } from 'react'
import FormComponent from '../components/Form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Rounds from '../components/Rounds';
import Timer from '../components/Timer';
import { useAppSelector } from '../store/hooks';
import { IMessage } from '../models/message';
import { Form } from 'react-bootstrap';
import Photo from '../components/Photo';
import '../styles/modes.scss'


const FormPage = () => {
  const [params, setParams] = useSearchParams()
  const round = params.get('round')
  const {mode} = useAppSelector(state => state.modesSlice)
  const {id, socket, username} = useAppSelector(state => state.canvasSlice)
  const [value, setValue] = useState<string>('')

  const timerHandler = useCallback(() => {
    console.log(value)
    if (+round! + 1 < mode?.roundsCount!) {
      const msg: IMessage = {
        id,
        username,
        method: 'finish',
        sentence: value,
        round: +round!,
        path: `/${mode?.rounds[+round! + 1].type}/?round=${+round! + 1}`
      }
      socket?.send(JSON.stringify(msg))
    }
    else {
      const msg: IMessage = {
        id,
        username,
        method: 'finish',
        sentence: value,
        round: +round!,
        path: `/finish/` + id
      }
      socket?.send(JSON.stringify(msg))
    }
  }, [value])

  return (
    <div className='form-page'>
        <Rounds round={+round!} allRounds={mode?.roundsCount!}/>
        <Timer allTime={mode?.rounds[+round!].time!} callback={timerHandler}/>
        <div className="form-page-content">
          <Form.Label className="form-page-content-label">
            Enter text to your friends!
          </Form.Label>
          <Form.Label htmlFor='form-input'>
            {value}
          </Form.Label>
          <Form.Control
              id='form-input'
              value={value}
              onChange={e => setValue(e.target.value)}
              as='textarea'
              rows={3}
          />
          {
            +round! !== 0 ? 
            <Photo id={id} round={+round! - 1} username={mode?.rounds[+round! - 1].players[mode.currentPlayerNumber].username!} /> : null
          }
        </div>
    </div>
  )
}

export default FormPage