import { Socket } from 'socket.io';
import { createRoom } from './Sockets/createRoom';
import { joinRoom } from './Sockets/joinRoom';
import { sendRoomData } from './Sockets/sendRoomData';
import { changePlayersReady } from './Sockets/changePlayersReady';

export const roomModule = (socket: Socket) => {
  createRoom(socket);
  joinRoom(socket);
  sendRoomData(socket);
  changePlayersReady(socket);
};
