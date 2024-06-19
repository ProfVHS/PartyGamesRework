import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';

export const joinRoom = async (socket: Socket) => {
  socket.on('join_room', async (roomCode, nickname) => {
    const roomExistence: boolean = (
      await checkRoomExistence(roomCode)
    ).valueOf();

    if (!roomExistence) {
      socket.nsp.to(socket.id).emit('cannot_join', 'Room not found');
      return;
    }

    const usersInRoom: number = await new Promise((resolve) => {
      db.all(
        `SELECT * FROM users WHERE room_id = ?`,
        [roomCode],
        (err, rows) => {
          if (err) {
            console.error('joinRoom.ts: Users Select');
            console.error(err.message);
          } else {
            resolve(rows.length);
          }
        }
      );
    });

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
