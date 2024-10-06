import { Socket } from 'socket.io';
import { getMinigame } from '../../../../Database/MiniGames/getMinigame';

export const minigameData = async (socket: Socket) => {
  socket.on('get_minigame', async (roomCode: string) => {
    const minigame = await getMinigame(roomCode);

    socket.nsp.to(socket.id).emit('receive_currentMinigame', minigame);
  });
};
