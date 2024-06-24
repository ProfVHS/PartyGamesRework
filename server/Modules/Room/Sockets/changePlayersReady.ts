import { Socket } from 'socket.io';
import { roomType } from '../../../Types/roomType';
import { updatePlayersReady } from '../Functions/updatePlayersReady';
import { getRoomData } from '../../../Database/Room/getRoomData';

export const changePlayersReady = (socket: Socket) => {
  socket.on('toggle_ready', async (roomData: roomType, readyvalue: number) => {
    await updatePlayersReady(roomData.id, readyvalue);

    getRoomData(roomData.id).then((room) => {
      socket.nsp.to(roomData.id).emit('update_room', room);
    });
  });
};
