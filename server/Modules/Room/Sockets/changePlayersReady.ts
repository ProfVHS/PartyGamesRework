import { Socket } from 'socket.io';
import { roomType } from '../../../Types/roomType';
import { updatePlayersReady } from '../Functions/updatePlayersReady';
import { sendRoomData } from '../Functions/sendRoomData';

export const changePlayersReady = (socket: Socket) => {
  socket.on('toggle_ready', async (roomData: roomType, readyvalue: number) => {
    await updatePlayersReady(roomData.id, readyvalue);

    sendRoomData(socket, roomData.id);
  });
};
