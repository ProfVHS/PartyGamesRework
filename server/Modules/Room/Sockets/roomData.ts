import { Socket } from 'socket.io';
import { sendRoomData } from '../Functions/sendRoomData';

export const roomData = async (socket: Socket) => {
  socket.on('get_room', (roomCode: string) => {
    if (!roomCode) {
      const tempRoomCode = Array.from(socket.rooms)
        .filter((room) => room !== socket.id)
        .toString();

      roomCode = tempRoomCode;
    }

    sendRoomData(socket, roomCode);
  });
};
