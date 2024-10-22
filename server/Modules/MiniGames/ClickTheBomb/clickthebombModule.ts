import { Socket } from 'socket.io';
import { updateCounter } from './Sockets/updateCounter';
import { startGame } from './Sockets/startGame';

export const clickTheBombModule = (socket: Socket) => {
  startGame(socket);
  updateCounter(socket);
};
