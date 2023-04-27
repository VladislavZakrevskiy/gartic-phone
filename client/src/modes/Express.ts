import { IUser } from "../models/IUser";
import { Mode } from "./Mode";



export class Express extends Mode {
    writeTime: number = 10000
    drawTime: number = 30000

    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
        this.configureRounds()
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