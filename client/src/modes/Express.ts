import { IUser } from "../models/IUser";
import { Mode } from "./Mode";



export class Express extends Mode {
    writeTime: number = 10000
    drawTime: number = 30000

    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
        this.configureRounds()
    }

}