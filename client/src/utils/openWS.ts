import { IUser } from "../models/IUser"
import { IMessage, connectionMessage } from "../models/message"
import { deleteUser, setUsers } from "../store/reducers/UserSlice"
import { setSocket } from "../store/reducers/canvasSlice"
import { ConnectionWS } from "./connectionWS"


export const openWS = (dispatch: any, username: string, id: string, users: IUser[] ) => {
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
                    console.log(msg)
                    console.log('connection is closed ' + msg.username)
                    dispatch(deleteUser(msg.username))

            }
        }
        // socket.onclose = (ev) => {
        //     const msg: IMessage = {
        //         id: id,
        //         username: username,
        //         method: 'close'
        //     }
        //     socket.send(JSON.stringify(msg))
        // }
    }
}