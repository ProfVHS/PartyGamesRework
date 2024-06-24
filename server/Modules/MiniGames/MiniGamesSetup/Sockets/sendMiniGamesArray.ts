import { Socket } from 'socket.io';
import { generateMiniGamesArray } from '../Functions/generateMiniGamesArray';

export const sendMiniGamesArray = (socket: Socket) => {
  socket.on(
    'create_miniGamesArray',
    (
      roomCode: string,
      miniGamesArray: string[],
      miniGamesArrayLength: number
    ) => {
      console.log('Create array');
      // MiniGamesArray selected by the host
      if (miniGamesArray.length > 0) {
        socket.nsp.to(roomCode).emit('update_miniGamesArray', miniGamesArray);
        return;
      }

      // Randomly generate miniGamesArray
      const miniGames = generateMiniGamesArray(miniGamesArrayLength);

      socket.nsp.to(roomCode).emit('update_miniGamesArray', miniGames);
    }
  );
};
