import { Socket } from 'socket.io';

import { userType } from '../../../Types/userType';
import { roomType } from '../../../Types/roomType';

import { getUserData } from '../../../Database/Users/getUserData';
import { getRoomData } from '../../../Database/Room/getRoomData';

import { deleteRoomAndUsers } from '../../Room/Functions/deleteRoomAndUsers';
import { updateAliveUser } from '../Functions/updateAliveUser';
import { deleteUser } from '../Functions/deleteUser';
import { updateDisconnectedUser } from '../Functions/updateDisconnectedUser';
import { sendUsersData } from '../Functions/sendUsersData';

export const disconnectUser = async (socket: Socket) => {
  socket.on('disconnect', async () => {
    const user: userType = await getUserData(socket.id);

    if (!user) return;

    const room: roomType = await getRoomData(user.room_id);

    if (!room) return;

    if (user.isHost == true) {
      socket.to(user.room_id).emit('host_left');
      deleteRoomAndUsers(user.room_id);
      console.log('Host wyszedł');
    } else {
      if (room.in_game) {
        updateDisconnectedUser(user.id, true);
        updateAliveUser(user.id, false);
      } else {
        deleteUser(user.id);
      }
      sendUsersData(socket, user.room_id);
    }
    console.log('User Disconnected', user.nickname);
  });
};
