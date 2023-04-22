import { IUser } from "../models/IUser";
import { Mode } from "./Mode";



export class Plagiarism extends Mode {
    constructor(socket: WebSocket, players: IUser[]) {
        super(socket, players)
    }
}