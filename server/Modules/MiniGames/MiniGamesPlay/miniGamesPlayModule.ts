import { Socket } from 'socket.io';
import { updateCurrentMiniGame } from './Sockets/updateCurrentMiniGame';
import { sendAndChangeUserTurn } from './Sockets/sendAndChangeUserTurn';

export const miniGamesPlayModule = (socket: Socket) => {
  updateCurrentMiniGame(socket);
  sendAndChangeUserTurn(socket);
};
