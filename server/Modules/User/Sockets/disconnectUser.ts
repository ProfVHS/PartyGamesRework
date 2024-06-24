import { Socket } from 'socket.io';
import { userType } from '../../../Types/userType';

import { getUserData } from '../../../Database/Users/getUserData';

import { deleteRoom } from '../../Room/Functions/deleteRoom';
import { deleteUsers } from '../Functions/deleteUsers';
import { deleteUser } from '../Functions/deleteUser';
import { sendUsersData } from '../Functions/sendUsersData';

export const disconnectUser = async (socket: Socket) => {
  socket.on('disconnect', async () => {
    const user: userType = await getUserData(socket.id);

    if (!user) return;

    if (user.isHost == true) {
      deleteRoom(user.room_id);
      deleteUsers(user.room_id);
      console.log('Host wyszedł');
    } else {
      deleteUser(user.id);
      sendUsersData(socket, user.room_id);
    }
    console.log('User Disconnected', user.nickname);
  });
};
