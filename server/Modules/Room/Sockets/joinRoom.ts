import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';
import { getUsersLength } from '../../../Database/Users/getUsersLength';

export const joinRoom = async (socket: Socket) => {
  socket.on('join_room', async (roomCode, nickname) => {
    const roomExistence: boolean = (
      await checkRoomExistence(roomCode)
    ).valueOf();

    if (!roomExistence) {
      socket.nsp.to(socket.id).emit('cannot_join', 'Room not found');
      return;
    }

    const usersInRoom: number = await getUsersLength(roomCode);

    if (usersInRoom >= 8) {
      socket.nsp.to(socket.id).emit('cannot_join', 'Room is full');
      return;
    }

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

      socket.nsp.to(socket.id).emit('can_join');
    });
  });
};
