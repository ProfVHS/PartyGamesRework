import { Socket } from 'socket.io';
import { sendUsersData } from '../Functions/sendUsersData';

export const usersData = async (socket: Socket) => {
  socket.on('get_users', () => {
    const roomCode = Array.from(socket.rooms)
      .filter((room) => room !== socket.id)
      .toString();

    sendUsersData(socket, roomCode);
  });
};
