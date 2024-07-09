import { Socket } from 'socket.io';
import { miniGamesSetupModule } from './MiniGamesSetup/miniGamesSetupModule';
import { miniGamesPlayModule } from './MiniGamesPlay/miniGamesPlayModule';

export const miniGamesModule = (socket: Socket) => {
  miniGamesSetupModule(socket);
  miniGamesPlayModule(socket);
};
