import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';
import { createUser } from '../../User/Functions/createUser';

export const createRoom = async (socket: Socket) => {
  socket.on('create_room', async (roomCode: string, nickname: string) => {
    const roomExistence = (await checkRoomExistence(roomCode)).valueOf();

    if (roomExistence) {
      socket.nsp.to(socket.id).emit('cannot_join');
      return;
    }

    await new Promise<void>(async (resolve) => {
      await createUser(socket.id, nickname, roomCode, true);

      db.run(
        `INSERT INTO rooms (id, round, players_ready, current_minigame, in_game, turn) VALUES (?, 0, 0, 0, false, 1)`,
        [roomCode],
        (err) => {
          if (err) {
            console.error('createRoom.ts: Room Insert');
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
