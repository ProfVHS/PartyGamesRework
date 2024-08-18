import { Socket } from 'socket.io';
import { startGame } from './Sockets/startGame';
import { checkAreUsersReady } from './Sockets/checkAreUsersready';
import { updateUserScoreCards } from './Sockets/updateUserScoreCards';

export const cardsModule = (socket: Socket) => {
  startGame(socket);
  checkAreUsersReady(socket);
  updateUserScoreCards(socket);
};
