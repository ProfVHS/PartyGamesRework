import { Socket } from 'socket.io';
import { miniGamesSetupModule } from './MiniGamesSetup/miniGamesSetupModule';
import { miniGamesPlayModule } from './MiniGamesPlay/miniGamesPlayModule';
import { clickthebombModule } from './ClickTheBomb/clickthebombModule';
import { cardsModule } from './Cards/cardsModule';

export const miniGamesModule = (socket: Socket) => {
  miniGamesSetupModule(socket);
  miniGamesPlayModule(socket);
  clickthebombModule(socket);
  cardsModule(socket);
};
