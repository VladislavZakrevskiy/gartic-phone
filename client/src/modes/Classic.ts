import { IUser } from "../models/IUser";
import { Mode } from "./Mode";



export class Classic extends Mode {
    drawTime: number = 60000
    writeTime: number = 20000 

    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
    }

}