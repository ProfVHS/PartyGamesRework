import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { sendUsersData } from '../../../Database/Users/sendUsersData';
import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';

export const joinRoom = async (socket: Socket) => {
  socket.on('check_if_can_join', async (roomCode: string) => {
    const roomExistence = (await checkRoomExistence(roomCode)).valueOf();

    if (!roomExistence) {
      socket.nsp.to(socket.id).emit('cannot_join', 'Room not found');
      return;
    }

    socket.nsp.to(socket.id).emit('can_join');
  });

  socket.on('join_room', async (roomCode, nickname) => {
    await new Promise(() => {
      db.run(
        `INSERT INTO users (id, nickname, score, room_id) VALUES (?, ?, ?, ?)`,
        [socket.id, nickname, 100, roomCode],
        (err) => {
          if (err) {
            console.error('joinRoom.ts: Users Insert');
            console.error(err.message);
          }
        }
      );

      socket.join(roomCode);

      sendUsersData(socket, roomCode);
    });
  });
};
