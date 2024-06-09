import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ExpressPeerServer } from 'peer';
import cors from 'cors';

const PEER_PORT = process.env.PEER_PORT || 9000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3000;

const app = express();

app.use(cors());

const peerServer = createServer(app);

const peerApp = ExpressPeerServer(peerServer, {
  path: '/',
});

app.use('/', peerApp);

peerServer.listen(PEER_PORT, () => {
  console.log(`PeerJS server is running on port ${PEER_PORT}`);
});

const socketServer = createServer(app);
const io = new Server(socketServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  socket.on('startEvent', (data) => {
    console.log('startEvent:', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server is running on port ${SOCKET_PORT}`);
});
