import { Socket } from 'socket.io';
import { updateCurrentMiniGame } from './Sockets/updateCurrentMiniGame';
import { sendUserTurn } from './Sockets/sendUserTurn';

export const miniGamesPlayModule = (socket: Socket) => {
  updateCurrentMiniGame(socket);
  sendUserTurn(socket);
};
