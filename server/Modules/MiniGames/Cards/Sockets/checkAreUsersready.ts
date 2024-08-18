import { Socket } from 'socket.io';
import { getUsersData } from '../../../../Database/Users/getUsersData';

export const checkAreUsersReady = (socket: Socket) => {
  socket.on('check_are_users_ready', async (roomCode: string) => {
    console.log('check_are_users_ready');

    const users = await getUsersData(roomCode);

    socket.nsp.to(roomCode).emit('all_users_ready_cards', users);
  });
};
