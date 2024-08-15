import { Socket } from 'socket.io';
import { getUsersData } from '../../../Database/Users/getUsersData';

export const sendUsersData = async (socket: Socket, roomCode: string) => {
  await new Promise<void>((resolve) => {
    getUsersData(roomCode).then((users) => {
      socket.nsp.to(roomCode).emit('update_users', users);
      resolve();
    });
  });
};
