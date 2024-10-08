import { Socket } from 'socket.io';
import { sendUsersData } from '../Functions/sendUsersData';
import { updateAliveUser } from '../Functions/updateAliveUser';

export const updateUserAlive = async (socket: Socket) => {
  socket.on('update_user_alive', async (roomCode: string, alive: boolean) => {
    console.log('update_user_alive', alive, socket.id, roomCode);
    await updateAliveUser(socket.id, alive).then(() => {
      sendUsersData(socket, roomCode);
    });
  });
};
