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
      // MiniGamesArray selected by the host
      if (miniGamesArray.length > 0) {
        socket.nsp.to(roomCode).emit('receive_minigamesArray', miniGamesArray);
        return;
      }

      // Randomly generate miniGamesArray
      const miniGames = generateMiniGamesArray(miniGamesArrayLength);

      socket.nsp.to(socket.id).emit('receive_minigamesArray', miniGames);
    }
  );
};
