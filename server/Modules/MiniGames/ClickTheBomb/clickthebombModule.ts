import { Socket } from 'socket.io';
import { updateCounter } from './Sockets/updateCounter';
import { startGame } from './Sockets/startGame';

export const clickthebombModule = (socket: Socket) => {
  updateCounter(socket);
  startGame(socket);
};
