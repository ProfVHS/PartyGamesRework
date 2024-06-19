import { Socket } from 'socket.io';
import { getRoomData } from '../../../Database/Room/getRoomData';

export const sendRoomData = async (socket: Socket) => {
  socket.on('get_room', () => {
    const roomCode = Array.from(socket.rooms)
      .filter((room) => room !== socket.id)
      .toString();

    getRoomData(roomCode).then((room) => {
      socket.nsp.to(roomCode).emit('update_room', room);
    });
  });
};
