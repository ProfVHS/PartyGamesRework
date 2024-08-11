import { Socket } from 'socket.io';
import { getRoomData } from '../../../../Database/Room/getRoomData';
import { roomType } from '../../../../Types/roomType';
import { changeUserTurn } from '../Functions/changeUserTurn';
import { sendUsersData } from '../../../User/Functions/sendUsersData';
import { getUsersData } from '../../../../Database/Users/getUsersData';

export const sendUserTurn = async (socket: Socket) => {
  socket.on('change_turn', async (roomCode: string) => {
    await changeUserTurn(roomCode).then(async () => {
      const room = await getRoomData(roomCode);
      const users = await getUsersData(roomCode);

      const user = users.find((user) => user.position_in_room === room.turn);

      socket.nsp.to(roomCode).emit('update_turn', user);
    });
  });
};
