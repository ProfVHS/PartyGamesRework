import { Socket } from 'socket.io';
import { startGame } from './Sockets/startGame';
import { updateUserScoreCards } from './Sockets/updateUserScoreCards';
import { updateSelectedCard } from './Sockets/updateSelectedCard';

export const cardsModule = (socket: Socket) => {
  startGame(socket);
  updateUserScoreCards(socket);
  updateSelectedCard(socket);
};
