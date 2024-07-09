import { Socket } from 'socket.io';
import { Minigame } from '../../../../Types/Minigame';

export const updateCurrentMiniGame = (socket: Socket) => {
  socket.on('update_currentMinigame', (roomCode: string, game: Minigame) => {
    console.log('update_currentMinigame', roomCode, game);

    socket.nsp.to(roomCode).emit('receive_currentMinigame', game);
  });
};
