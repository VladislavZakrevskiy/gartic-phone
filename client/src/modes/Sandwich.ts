import { IUser } from "../models/IUser";
import { IElement, IRound, Mode } from "./Mode";
import Photo from '../components/Photo';



export class Sandwich extends Mode {
    constructor(socket: WebSocket, players: IUser[], username: string) {
        super(socket, players, username)
        this.configureRounds()
    }

    determineSequence (i: number) {
        if(i === 0 || i === this.roundsCount - 1) {
            i === 1 ? 
            this.sequence[i] = 'drawRound'
            : this.sequence[i] = 'writeRound'
        }  
        else {
            this.sequence[i] = 'drawRound'
        }
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

    getClassElement(i: number, page: 'draw' | 'write'): IElement | null {
        if(page === 'write' && i !== 0) {
            console.log(1)
            return {
                element: 'Photo',
                id: this.players[0].id!,
                round: i - 1,
                username: this.rounds[i - 1].players[this.currentPlayerNumber].username
            }
        }
        if(page === 'draw' && i === 1) {
            console.log(2)
            return {
                element: 'Sentences',
                id: this.players[0].id!,
                round: i - 1,
                username: this.rounds[i - 1].players[this.currentPlayerNumber].username
            }
        }
        if(i === 0) {
            return null
        }
        console.log(4)
        return {
            element: 'Photo',
            id: this.players[0].id!,
            round: i - 1,
            username: this.rounds[i - 1].players[this.currentPlayerNumber].username
        }
    }
}