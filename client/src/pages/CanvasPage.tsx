import  { useCallback } from 'react'
import ToolBar from '../components/ToolBar'
import Settings from '../components/Settings'
import Canvas from '../components/Canvas'
import UserList from '../components/UserList'
import Rounds from '../components/Rounds'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Timer from '../components/Timer'
import { useAppSelector } from '../store/hooks'

type Props = {}

const CanvasPage = (props: Props) => {
  const [params, setParams] = useSearchParams()
  const round = params.get('round')
  const {mode} = useAppSelector(state => state.modesSlice)
  const nav = useNavigate()
  const {id} = useAppSelector(state => state.canvasSlice)

  const timerHandler = useCallback(() => {
    if (+round! + 1 < mode?.roundsCount!) {
      nav(`/${mode?.rounds[+round! + 1].type}/?round=${+round! + 1}`)
    }
    else {nav(`/finish/` + id)}
  }, [])

  return (
    <div className='app'>
      <Rounds round={+round!} allRounds={mode?.roundsCount!}/>
      <Timer allTime={mode?.rounds[+round!].time!} callback={timerHandler}/>
      <ToolBar/>
      <Settings/>
      <UserList/>
      <Canvas/>
    </div>
  )
}

export default CanvasPage