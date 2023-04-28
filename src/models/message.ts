import { Mode } from "../modes/Mode"
import { IUser } from "./IUser"


export interface IMessage {
    id: string | undefined
    username?: string | null
    method: 'connection' | 'users' | 'close' | 'start' | 'finish' | 'pagination'
    type?: 'drawRound' | 'writeRound',
    round?: number
    users?: IUser[]
    mode?: 'Classic' | 'Crowd' | 'Express' | 'Icebreaker' | 'Plagiarism' | 'Sandwich' | 'Secret',
    path?: string
    load?: () => void
    image?: string
    sentence?: string
}

export interface connectionMessage extends IMessage {
    method: 'connection'
}



