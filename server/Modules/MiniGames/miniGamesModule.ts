import { Socket } from 'socket.io';

import { miniGamesSetupModule } from './MiniGamesSetup/miniGamesSetupModule';

export const miniGamesModule = (socket: Socket) => {
  miniGamesSetupModule(socket);
};
