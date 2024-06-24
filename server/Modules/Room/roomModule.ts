import { Socket } from 'socket.io';
import { createRoom } from './Sockets/createRoom';
import { joinRoom } from './Sockets/joinRoom';
import { roomData } from './Sockets/roomData';
import { changePlayersReady } from './Sockets/changePlayersReady';

export const roomModule = (socket: Socket) => {
  createRoom(socket);
  joinRoom(socket);
  roomData(socket);
  changePlayersReady(socket);
};
