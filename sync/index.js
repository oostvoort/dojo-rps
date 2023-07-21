import { WebSocketServer } from 'ws';

const PORT = 8081

const wss = new WebSocketServer({ port: PORT });

console.info('Websocket Sync is running on port:', PORT)

const connectedClients = []
let id = 0

wss.on('connection', function connection(ws) {
    const clientId = id++
    connectedClients.push({id: clientId, client: ws})

    ws.on('message', function message(data) {
        console.info('[Message Received]', data.toString())
        broadcastMessage(data.toString(), clientId)
    });

    ws.send(JSON.stringify({message: 'connection was established'}));
});

function broadcastMessage(message, sender) {
    connectedClients.forEach(({id, client}) => {
        if (sender !== id) client.send(message)
    })
}


