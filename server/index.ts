import express from 'express';
import { createServer } from 'http';
import { ExpressPeerServer } from 'peer';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

import { createDatabaseTables, db } from './Database/database';

const app = express();
app.use(cors());

//
//  Peer server
//

const PEER_PORT = process.env.PEER_PORT || 9000;

const peerServer = createServer(app);

const peerApp = ExpressPeerServer(peerServer, {
  path: '/',
});

app.use('/', peerApp);

peerServer.listen(PEER_PORT, () => {
  console.log(`PeerJS server is running on port ${PEER_PORT}`);
});

//
// Socket server n
//

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;

const socketServer = createServer(app);

const io = new Server(socketServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

import { roomModule } from './Modules/Room/roomModule';
import { usersModule } from './Modules/User/usersModule';

const handleModulesOnConnection = async (socket: Socket) => {
  console.log('New connection', socket.id);
  roomModule(socket);
  usersModule(socket);
};

io.on('connection', handleModulesOnConnection);

socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server is running on port ${SOCKET_PORT}`);
  createDatabaseTables();
});
