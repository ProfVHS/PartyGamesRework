import { Socket } from 'socket.io';
import { startGame } from './Sockets/startGame';

export const cardsModule = (socket: Socket) => {
  startGame(socket);
};
