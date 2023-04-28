//@ts-nocheck
import { IUser } from "../models/IUser";
import { Mode } from "./Mode";



export class Classic extends Mode {
    drawTime: number = 60000
    writeTime: number = 20000 

    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
    }

    getClassElement(i: number, page: 'draw' | 'write') {
        if(i === 0) {
            return null
        }
        if(page === 'write' && i !== 0) {
            return {
                element: 'Photo',
                id: this.players[0].id!,
                round: i - 1,
                username: this.rounds[i - 1].players[this.currentPlayerNumber].username
            }
        }
        if(page === 'draw') {
            return {
                element: 'Sentences',
                id: this.players[0].id!,
                round: i - 1,
                username: this.rounds[i - 1].players[this.currentPlayerNumber].username
            }
        }
        return null
    }

}