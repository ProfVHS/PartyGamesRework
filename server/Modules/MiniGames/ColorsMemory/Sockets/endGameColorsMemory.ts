import { Socket } from 'socket.io';

import { updateAliveUsers } from '../../../User/Functions/updateAliveUsers';

export const endGameColorsMemory = async (socket: Socket) => {
  socket.on('end_game_colors_memory', async (roomCode: string) => {
    await updateAliveUsers(roomCode, true);

    //socket.nsp.to(roomCode).emit('start_new_game');
  });
};
