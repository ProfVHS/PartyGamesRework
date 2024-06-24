import { Socket } from 'socket.io';
import { getRoomData } from '../../../Database/Room/getRoomData';

export const sendRoomData = (socket: Socket, roomCode: string) => {
  getRoomData(roomCode).then((room) => {
    socket.nsp.to(roomCode).emit('update_room', room);
  });
};
