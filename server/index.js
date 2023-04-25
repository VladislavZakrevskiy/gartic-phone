const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fs = require('fs')
const path = require('path')

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
            case 'pagination':
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

app.post ('/image', (req, res) => { 
    try {
        let {image, username} = req.body
        const {id, round} = req.query
        image = image.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(__dirname, 'images',`${round}SEPARATORSEPARATOR${id}SEPARATORSEPARATOR${username}.jpg`), image, 'base64')
        res.status(200).json('ok')
    } catch (e) {
        console.log(e)
        res.status(500).json('error')
    }
}) //body: image, username; query: id, round

app.get('/image', (req, res) => {
    try {
        const {round, id, username} = req.query
        const file = fs.readFileSync(path.resolve(__dirname, 'images', `${round}SEPARATORSEPARATOR${id}SEPARATORSEPARATOR${username}.jpg`))
        const data = 'data:image/png;base64,' + file.toString('base64')
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json('error')
    }
})// query: id, round, username

app.post('/sentence', (req,res) => {
    try {
        let {sentence, username} = req.body
        const {id, round} = req.query
        fs.appendFileSync(path.resolve(__dirname, 'sentences',`${round}SEPARATORSEPARATOR${id}.txt`), `${username}SEPARATORIN${sentence}SEPARATORON`)
        res.status(200).json('ok')
    } catch (e) {
        console.log(e)
        res.status(500).json('error')
    }
})//body: sentence, username; query: id, round

app.get('/sentence', (req,res) => {
    try {
        const {round, id} = req.query
        const file = fs.readFileSync(path.resolve(__dirname, 'sentences', `${round}SEPARATORSEPARATOR${id}.txt`))
        const array = file.toString('utf-8').split('SEPARATORON')
        const lastElement = array.length - 1
        const data = array.map(item =>({
            sentence: item.split('SEPARATORIN')[1],
            username: item.split('SEPARATORIN')[0]
        })).slice(0, lastElement)
        res.json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json('error')
    } 
})//query: round, id




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

