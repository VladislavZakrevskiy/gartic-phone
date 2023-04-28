import { IUser } from "../models/IUser";
import { IRound, Mode } from "./Mode";



export class Plagiarism extends Mode {
    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
    }


    
    determineSequence(i: number): void {
        if(i === 0) {
            this.sequence[i] = 'writeRound'
        }
        else this.sequence[i] = 'drawRound'
    }

    configureRounds() {
        // very bad code, but js <<<<<<<<<<<<<
        for(let i = 0; i < this.roundsCount; i++) {
            //type
            this.determineSequence(i)
            //time
            switch(this.sequence[i]) {
                case 'drawRound': 
                    this.times[i] = this.drawTime
                    break;
                case 'writeRound': 
                    this.times[i] = this.writeTime
                    break;
            }
            //players
            this.playersRound[i] = this.rotate(this.players, i + 1)
        }
        let configRounds: IRound[] = []
        for(let i = 0; i < this.roundsCount; i++) {
            //configure
            let round: IRound = {players: [], time: 0, type: ''}
            round.players = this.playersRound[i]
            round.time = this.times[i]
            round.type = this.sequence[i]
            configRounds[i] = round
        }
        this.rounds = configRounds
    }

    getClassElement(i: number, page: 'draw' | 'write') {
        if(i === 0) {
            return null
        }
        if(page === 'draw') {
            const num = i !== this.currentPlayerNumber && i + 1 < this.roundsCount ? i : i + 1
            console.log(this.players[num].username)
            return {
                element: 'Photo',
                id: this.players[0].id!,
                round: 0,
                username: this.players[num].username
            }
        }
        return null
    }
}