import Photo from '../components/Photo'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import '../styles/modes.scss'
import { Button, FormText, Nav } from 'react-bootstrap'
import Sentences from '../components/Sentences'
import { useEffect, useState } from 'react'
import { IUser } from '../models/IUser'
import { IMessage } from '../models/message'
import AppeareElement from '../components/ApeareElement'
import '../styles/modes.scss'


const FinishPage = () => {
  const {id} = useParams()
  const {mode, page} = useAppSelector(state => state.modesSlice)
  const {socket, username} = useAppSelector(state => state.canvasSlice)
  const [data, setData] = useState<string[][]>([[]])
  const nav = useNavigate()

  useEffect(() => {
    let array: string[][] = []
      for(let i = 0; i < mode?.roundsCount!; i++) {
        let playerArray: string[] = []
        for(let j = 0; j < mode?.roundsCount!; j++) {
          playerArray.push( mode?.rounds[j].players[i].username!)
          j + 1 === mode?.roundsCount ? array.push(playerArray) : null
        }
      }
      setData(array) 
  }, [])

  const nextBtnHandler = () => {
    const msg: IMessage = {
      id, username, 
      method: 'pagination'
    }
    page + 1 === mode?.roundsCount! ?
    nav(`/${id!}1`) :
    socket?.send(JSON.stringify(msg)) 
  }

  return (
    <div className='finish-page'>
      <FormText id='up'>{page + 1} Round</FormText>
      {
        data[page].map((username, j) => {
          if(mode?.rounds[j].type == 'writeRound') {
            return (
            <AppeareElement className='finish-page-sentence' time={j * 2}>
              <FormText as='h3' style={{display: 'flex', flexDirection: 'column'}}>{username}: </FormText>
              <Sentences id={id!} round={j} usernames={[username]}/>
            </AppeareElement>
            )
          }
          return (
              <AppeareElement className='finish-page-photo' time={j * 2}>
                <FormText as='h3' style={{display: 'flex', flexDirection: 'column'}}>{username}: </FormText>
                <Photo id={id!} round={j} username={username} className='finish-page-photo-img'/>
              </AppeareElement>
            )
          
        })
      }
      <Button className='finish-page-bth' href='#up' onClick={nextBtnHandler}>{`-->`}</Button>
    </div>
  )
}

export default FinishPage



 
// {
//   mode?.rounds.map((round, i) =>
//       <div style={{display: 'flex', flexDirection: 'column'}}> 
//         {i } Round
//         {
//           round.players.map((player, j) => 
//             {
//               if(i % 2 === 0) {
//                 // console.log(`${i} round ${j}. ${player.username} sentence`)
//                 return <Sentences id={id!} round={i} usernames={[player.username]}/>
//               }
//               // console.log(`${i} round ${j}. ${player.username} photo`)
//               return <Photo id={id!} round={i} username={player.username}/>
//             }
//           )
//         }
//       </div>
//     )
// }