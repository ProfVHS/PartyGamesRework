import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';

export const createRoom = async (socket: Socket) => {
  socket.on('create_room', async (roomCode: string, nickname: string) => {
    const roomExistence = (await checkRoomExistence(roomCode)).valueOf();

    if (roomExistence) {
      socket.nsp.to(socket.id).emit('cannot_join');
      return;
    }

    await new Promise<void>(async (resolve) => {
      db.run(
        `INSERT INTO rooms (id, round, players_ready, current_minigame) VALUES (?, 0, 0, 0)`,
        [roomCode],
        (err) => {
          if (err) {
            console.error('createRoom.ts: Room Insert');
            console.error(err.message);
          }
        }
      );
      db.run(
        `INSERT INTO users (id, nickname, score, room_id, isHost) VALUES (?, ?, ?, ?, ?)`,
        [socket.id, nickname, 100, roomCode, true],
        (err) => {
          if (err) {
            console.error('createRoom.ts: Users Insert');
            console.error(err.message);
          } else {
            resolve();
          }
        }
      );
    }).then(async () => {
      socket.join(roomCode);

      socket.nsp.to(socket.id).emit('can_join');
    });
  });
};
