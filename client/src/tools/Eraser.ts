import { drawMessage } from "../models/message";
import Tool from "./Tool";
import React from 'react';
import undoRedo, { setter } from './UndoRedo';



export default class Eraser extends Tool {

    mouseDown: boolean = false

    constructor(canvas: HTMLCanvasElement | null, socket: WebSocket, id: string, undoRedo: undoRedo) {
        super(canvas, socket, id, undoRedo)
        this.listen()
    }

    listen() {
        // @ts-ignore
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        // @ts-ignore
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        // @ts-ignore
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this) 
    }

    mouseUpHandler(e: React.FormEvent<HTMLCanvasElement>) {
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx?.beginPath()
        // @ts-ignore
        this.ctx?.moveTo(e.pageX- e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown){
        // @ts-ignore
        this.draw(e.pageX- e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    draw( x:number, y:number) {
        this.ctx?.lineTo(x, y)
        this.ctx!.strokeStyle = 'white'
        this.ctx?.stroke()
        this.ctx!.strokeStyle = 'black'
    }
}