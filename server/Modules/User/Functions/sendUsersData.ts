import { Socket } from 'socket.io';
import { getUsersData } from '../../../Database/Users/getUsersData';

export const sendUsersData = (socket: Socket, roomCode: string) => {
  getUsersData(roomCode).then((users) => {
    socket.nsp.to(roomCode).emit('update_users', users);
  });
};
