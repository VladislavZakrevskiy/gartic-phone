import React, { useEffect } from 'react'
import ModeBar from '../components/ModeBar'
import UserList from '../components/UserList'
import ModalComponent from '../components/Modal'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setId } from '../store/reducers/canvasSlice'
import { useParams } from 'react-router-dom'
import { openWS } from '../utils/openWS'
import '../styles/home.scss' 

type Props = {}

const HomePage = (props: Props) => {
    const {username} = useAppSelector(state => state.canvasSlice)
    const {users} = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(setId(id))
        openWS(dispatch, username!, id!, users)
        }, [username])
    return (
        <div className='home'>
            <ModalComponent/>
            <ModeBar/>
            <UserList/>
        </div>
    )
}

export default HomePage