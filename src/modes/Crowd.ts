import { IUser } from "../models/IUser";
import { Mode } from "./Mode";



export class Crowd extends Mode {
    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
    }
}