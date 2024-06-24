import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

import { createDatabaseTables } from './Database/database';

const app = express();
app.use(cors());

//
// Socket server
//

const SOCKET_PORT = process.env.SOCKET_PORT || 3000;

const socketServer = createServer(app);

const io = new Server(socketServer, {
  pingInterval: 5000, // Send a ping every 5 seconds
  pingTimeout: 3000, // Wait 3 seconds for a response
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

import { roomModule } from './Modules/Room/roomModule';
import { usersModule } from './Modules/User/usersModule';
import { miniGamesModule } from './Modules/MiniGames/minigamesModule';

const handleModulesOnConnection = async (socket: Socket) => {
  console.log('New connection', socket.id);
  roomModule(socket);
  usersModule(socket);
  miniGamesModule(socket);
};

io.on('connection', handleModulesOnConnection);

socketServer.listen(SOCKET_PORT, () => {
  console.log(`Socket server is running on port ${SOCKET_PORT}`);
  createDatabaseTables();
});
