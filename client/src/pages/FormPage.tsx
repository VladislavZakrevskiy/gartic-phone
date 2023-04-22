import React, { useCallback } from 'react'
import FormComponent from '../components/Form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Rounds from '../components/Rounds';
import Timer from '../components/Timer';
import { useAppSelector } from '../store/hooks';


const FormPage = () => {
  const [params, setParams] = useSearchParams()
  const round = params.get('round')
  const {mode} = useAppSelector(state => state.modesSlice)
  const {id} = useAppSelector(state => state.canvasSlice)
  const nav = useNavigate()

  const timerHandler = useCallback(() => {
    if (+round! + 1 < mode?.roundsCount!) {
      nav(`/${mode?.rounds[+round! + 1].type}/?round=${+round! + 1}`)
    }
    else {nav(`/finish/` + id)}
  }, [])

  return (
    <div>
        <Rounds round={+round!} allRounds={mode?.roundsCount!}/>
        <Timer allTime={mode?.rounds[+round!].time!} callback={timerHandler}/>
        <FormComponent/> 
    </div>
  )
}

export default FormPage