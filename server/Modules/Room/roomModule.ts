import { Socket } from 'socket.io';
import { createRoom } from './Sockets/createRoom';
import { joinRoom } from './Sockets/joinRoom';

module.exports = (socket: Socket) => {
  createRoom(socket);
  joinRoom(socket);
};
