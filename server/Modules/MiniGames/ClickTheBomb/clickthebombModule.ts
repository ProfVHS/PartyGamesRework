import { Socket } from 'socket.io';
import { updateCounter } from './Sockets/updateCounter';
import { startGame } from './Sockets/startGame';
import { changeTurnClickTheBomb } from './Sockets/changeTurnClickTheBomb';

export const clickthebombModule = (socket: Socket) => {
  startGame(socket);
  updateCounter(socket);
  changeTurnClickTheBomb(socket);
};
