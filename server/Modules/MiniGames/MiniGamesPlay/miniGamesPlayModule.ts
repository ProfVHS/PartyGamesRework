import { Socket } from 'socket.io';
import { updateCurrentMiniGame } from './Sockets/updateCurrentMiniGame';

export const miniGamesPlayModule = (socket: Socket) => {
  updateCurrentMiniGame(socket);
};
