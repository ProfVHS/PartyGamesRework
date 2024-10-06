import { Socket } from 'socket.io';
import { updateCurrentMiniGame } from './Sockets/updateCurrentMiniGame';
import { sendAndChangeUserTurn } from './Sockets/sendAndChangeUserTurn';
import { minigameData } from './Sockets/minigameData';

export const miniGamesPlayModule = (socket: Socket) => {
  minigameData(socket);
  updateCurrentMiniGame(socket);
  sendAndChangeUserTurn(socket);
};
