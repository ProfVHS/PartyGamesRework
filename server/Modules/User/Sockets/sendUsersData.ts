import { Socket } from 'socket.io';
import { getUsersData } from '../../../Database/Users/getUsersData';

export const sendUsersData = async (socket: Socket) => {
  socket.on('get_users', () => {
    console.log('Getting users data');
    const roomCode = Array.from(socket.rooms)
      .filter((room) => room !== socket.id)
      .toString();

    getUsersData(roomCode).then((users) => {
      socket.nsp.to(roomCode).emit('update_users', users);
    });
  });
};
