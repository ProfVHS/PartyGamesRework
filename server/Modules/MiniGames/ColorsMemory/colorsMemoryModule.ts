import { Socket } from 'socket.io';

import { endGameColorsMemory } from './Sockets/endGameColorsMemory';

export const colorsMemoryModule = (socket: Socket) => {
  endGameColorsMemory(socket);
};
