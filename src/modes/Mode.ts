//@ts-nocheck
import { IUser } from "../models/IUser"

type roundsTypes = 'drawRound' | 'writeRound' | ''

export interface IRound {
    type: roundsTypes
    players: IUser[]
    sentences?: string[]
    prints?: string[]
    time: number
}

export interface IElement {
    element: 'Photo' | 'Sentences'
    id: string
    round: number
    username: string 
}

export class Mode {
    drawTime: number = 60000
    writeTime: number = 20000 
    currentPlayerNumber: number = 0
    username: string
    socket: WebSocket
    roundsCount: number = 0
    players: IUser[]
    playersOdd: boolean = false
    rounds: IRound[] = []
    sequence: roundsTypes[] = []
    times: number[] = []
    playersRound: IUser[][] = []

    constructor(socket: WebSocket, players: IUser[], username: string) {
        this.socket = socket
        this.players = players
        this.username = username
        this.roundsCount = players.length
        this.isRoundsOdd()
        this.configureRounds()
        for (let i = 0; i < this.roundsCount; i++) {
            if(players[i].username === this.username) {
                this.currentPlayerNumber = i
                break;
            }
        }
    }

    rotate (players: IUser[], k: number) {
        return  [...players.slice(-k), ...players.slice(0, -k)]
    }

    isRoundsOdd() {
        if(this.roundsCount % 2 === 0) {
            this.playersOdd = true
        }
        else { this.playersOdd = false }
    }

    determineSequence (i: number) {
        if(i % 2 === 0){
            this.sequence[i] = 'writeRound'
        }
        else { 
            this.sequence[i] = 'drawRound'
        }
    }

    configureRounds() {
        // very bad code, but js <<<<<<<<<<<<<
        for(let i = 0; i < this.roundsCount; i++) {
            //type
            if(this.playersOdd) {
                this.determineSequence(i)
            }
            else { 
                this.determineSequence(i)
                this.sequence[this.roundsCount - 1] = 'drawRound'
            }
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

    getClassElement(i:number, page: "draw" | 'write') {}

}