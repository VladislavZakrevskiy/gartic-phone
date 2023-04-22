const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const imageController = require('./controllers/image.controller')

app.use(cors())
app.use(express.json())

app.ws('/', (ws, req) => {
    ws.send('Успешно подключился')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch(msg.method) {
            case 'connection': 
                connnectionHandler(ws, msg)
                break;
            case 'draw': 
                broadcast(ws, msg)
                break;
            case 'users':
                broadcastUsers(ws, msg)
                break;
            case 'undoRedo':
                broadcast(ws, msg)
                break;
            case 'close':  
                broadcast(ws, msg)
                break;
            case 'start': 
                broadcast(ws,msg)
                break;
            case 'finish': 
                broadcast(ws, msg)
                break;
        }
    })

    ws.on('close', () => {
        const msg = {
            id: ws.id,
            username: ws.username,
            method: 'close'
        }
        broadcast(ws, msg)
    })
})

app.post ('/image', imageController.load)
app.get('/image', imageController.upload)



app.listen(PORT, () => console.log('server started on ' + PORT))

const broadcast = (ws, msg) => {
    aWss.clients.forEach(client => {
        if(client.id == msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}

const broadcastUsers = (ws, msg) => {
    let users = []
    aWss.clients.forEach(client => {
        if(client.id == msg.id) {
            users.push({
                id: client.id,
                username: client.username
            })
        }
    })
    aWss.clients.forEach(client => {
        if(client.id == msg.id) {
            client.send(JSON.stringify({
                id: msg.id,
                method: 'users',
                username: msg.username,
                users
            }))
        }
    })
}


const connnectionHandler = (ws, msg) => {
    ws.id = msg.id
    ws.username = msg.username
    broadcast(ws,msg)
}

