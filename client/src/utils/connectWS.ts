import { IUser } from '../models/IUser';
import { IMessage } from '../models/message';
import { setTool } from '../store/reducers/toolSlice';
import Brush from '../tools/Brush';
import undoRedo from '../tools/UndoRedo';
import { drawHandler } from "./drawWS"


export const drawtWS = (username: string | null, id: string , dispatch: any, canvas: HTMLCanvasElement, tool: undoRedo, users: IUser[], socket: WebSocket) => {
    if( username ) {
        dispatch(setTool(new Brush(canvas, socket, id, tool)))
        socket.onmessage = (ev) => {
          const msg: IMessage = JSON.parse(ev.data)
          switch(msg.method) {
            case 'draw': 
              //@ts-ignore
              drawHandler(msg, canvas, tool)
              break;
            case 'undoRedo': 
              if(msg.type == 'undo') {
                tool.undo()
              }
              else {
                tool.redo()
              }
              break;
          }
        }
    }
}