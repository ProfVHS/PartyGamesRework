import { Socket } from 'socket.io';
import { startGame } from './Sockets/startGame';
import { updateUserScoreCards } from './Sockets/updateUserScoreCards';
import { updateSelectedCard } from './Sockets/updateSelectedCard';
import { getCards } from './Sockets/getCards';

export const cardsModule = (socket: Socket) => {
  startGame(socket);
  getCards(socket);
  updateUserScoreCards(socket);
  updateSelectedCard(socket);
};
