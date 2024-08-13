import { Socket } from 'socket.io';
import { changeUserTurn } from '../Functions/changeUserTurn';

export const sendUserTurn = async (socket: Socket) => {
  socket.on('change_turn', async (roomCode: string) => {
    await changeUserTurn(socket, roomCode);
  });
};
