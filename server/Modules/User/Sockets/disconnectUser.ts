import { Socket } from 'socket.io';

import { userType } from '../../../Types/userType';
import { roomType } from '../../../Types/roomType';

import { getUserData } from '../../../Database/Users/getUserData';
import { getRoomData } from '../../../Database/Room/getRoomData';

import { deleteRoomAndUsers } from '../../Room/Functions/deleteRoomAndUsers';
import { deleteUser } from '../Functions/deleteUser';
import { sendUsersData } from '../Functions/sendUsersData';
import { updateAliveUser } from '../Functions/updateAliveUser';
import { updateDisconnectedUser } from '../Functions/updateDisconnectedUser';
import { updateUserPositionInGame } from '../Functions/updateUserPositionInGame';

export const disconnectUser = async (socket: Socket) => {
  socket.on('disconnect', async () => {
    const user: userType = await getUserData(socket.id);

    if (!user) return;

    const room: roomType = await getRoomData(user.room_id);

    if (!room) return;

    if (user.isHost) {
      socket.to(user.room_id).emit('host_left');
      deleteRoomAndUsers(user.room_id);
      console.log('Host wyszedł');
    } else {
      if (room.in_game) {
        updateDisconnectedUser(user.id, true);
        updateAliveUser(user.id, false);
        updateUserPositionInGame(user.id, -1);
        socket.nsp.to(user.room_id).emit('update_users_ready');
      } else {
        deleteUser(user.id);
      }
      sendUsersData(socket, user.room_id);
    }
    console.log('User Disconnected', user.nickname);
  });
};
