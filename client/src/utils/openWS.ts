import { NavigateFunction } from "react-router-dom"
import { IUser } from "../models/IUser"
import { IMessage, connectionMessage } from "../models/message"
import { deleteUser, setUsers } from "../store/reducers/UserSlice"
import { setSocket } from "../store/reducers/canvasSlice"
import { ConnectionWS } from "./connectionWS"
import { pushFinish, setMode, setPage } from "../store/reducers/modesSlice"
import {Classic} from '../modes/Classic'
import {Crowd} from '../modes/Crowd'
import {Express} from '../modes/Express'
import {Icebreaker} from '../modes/Icebreaker'
import {Plagiarism} from '../modes/Plagiarism'
import {Sandwich} from '../modes/Sandwich'
import {Secret} from '../modes/Secret'


export const openWS = (dispatch: any, username: string, id: string, users: IUser[], nav: NavigateFunction) => {
    if(username) {
        const socket = new WebSocket('ws://localhost:5000')
        dispatch(setSocket(socket))
        const msg: connectionMessage = {
            id: id,
            method: 'connection',
            username: username
          }
        socket.onopen = () => {
            socket.send(JSON.stringify(msg))
        }
        socket.onmessage = (ev) => {
            const msg: IMessage = JSON.parse(ev.data)
            switch(msg.method) {
                case 'connection':
                    ConnectionWS(socket, msg, username, users)
                    break;
                case 'users': 
                    //@ts-ignore
                    dispatch(setUsers(msg.users))
                    break;
                case 'close':
                    console.log('connection is closed ' + msg.username)
                    dispatch(deleteUser(msg.username))
                    break;
                case 'start': 
                    nav('/writeRound?round=0')
                    //not oop, but how another?
                    console.log(users)
                    switch(msg.mode) {
                        case 'Classic': 
                            dispatch(setMode(new Classic(socket!, msg.users!, username)))
                            break;
                        case 'Crowd': 
                            dispatch(setMode(new Crowd(socket!, msg.users!, username)))
                            break;
                        case 'Express': 
                            dispatch(setMode(new Express(socket!, msg.users!, username)))
                            break;
                        case 'Icebreaker': 
                            dispatch(setMode(new Icebreaker(socket!, msg.users!, username)))
                            break;
                        case 'Plagiarism': 
                            dispatch(setMode(new Plagiarism(socket!, msg.users!, username)))
                            break;
                        case 'Sandwich': 
                            dispatch(setMode(new Sandwich(socket!, msg.users!, username)))
                            break;
                        case 'Secret': 
                            dispatch(setMode(new Secret(socket!, msg.users!, username)))
                            break;
                    }
                    break;
                case 'finish':
                    dispatch(pushFinish({finish: true, nav, path: msg.path!, image: msg.image!, round: msg.round!, username: msg.username!, currentName: username, sentence: msg.sentence!}))
                    break;
                case 'pagination':
                    dispatch(setPage())
                    break;
            }
        }
    }
}