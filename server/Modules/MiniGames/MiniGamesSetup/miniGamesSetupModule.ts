import { Socket } from 'socket.io';
import { sendMiniGamesArray } from './Sockets/sendMiniGamesArray';

export const miniGamesSetupModule = (socket: Socket) => {
  sendMiniGamesArray(socket);
};
