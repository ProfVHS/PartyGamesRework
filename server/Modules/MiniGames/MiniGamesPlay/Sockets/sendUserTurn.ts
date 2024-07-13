import { Socket } from 'socket.io';
import { getRoomData } from '../../../../Database/Room/getRoomData';
import { roomType } from '../../../../Types/roomType';
import { changeUserTurn } from '../Functions/changeUserTurn';
import { sendUsersData } from '../../../User/Functions/sendUsersData';

export const sendUserTurn = async (socket: Socket) => {
  socket.on('change_turn', async (roomCode: string) => {
    await changeUserTurn(roomCode).then(async () => {
      const room = await getRoomData(roomCode);

      socket.nsp.to(roomCode).emit('update_turn', room.turn);
    });
  });
};
