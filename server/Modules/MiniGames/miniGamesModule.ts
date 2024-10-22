import { Socket } from 'socket.io';
import { miniGamesSetupModule } from './MiniGamesSetup/miniGamesSetupModule';
import { miniGamesPlayModule } from './MiniGamesPlay/miniGamesPlayModule';
import { clickTheBombModule } from './ClickTheBomb/clickTheBombModule';
import { cardsModule } from './Cards/cardsModule';
import { colorsMemoryModule } from './ColorsMemory/colorsMemoryModule';

export const miniGamesModule = (socket: Socket) => {
  miniGamesSetupModule(socket);
  miniGamesPlayModule(socket);
  clickTheBombModule(socket);
  cardsModule(socket);
  colorsMemoryModule(socket);
};
