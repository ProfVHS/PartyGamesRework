import { Socket } from 'socket.io';
import { db } from '../../../Database/database';

import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';
import { createUser } from '../../User/Functions/createUser';
import { getUserData } from '../../../Database/Users/getUserData';

export const createRoom = async (socket: Socket) => {
  socket.on(
    'create_room',
    async (roomCode: string, nickname: string, prevUserId: string) => {
      const roomExistence = (await checkRoomExistence(roomCode)).valueOf();

      if (roomExistence) {
        socket.nsp.to(socket.id).emit('cannot_join', 'Room found');
        return;
      }

      const user = await getUserData(prevUserId);

      if (user) {
        socket.nsp
          .to(socket.id)
          .emit('cannot_join', 'You are already in other room');
        return;
      }

      await new Promise<void>(async (resolve) => {
        db.run(
          `INSERT INTO rooms (id, round, players_ready, in_game, turn) VALUES (?, 0, 0, false, 1)`,
          [roomCode],
          (err) => {
            if (err) {
              console.error('createRoom.ts: Room Insert');
              console.error(err.message);
            }
          }
        );

        await createUser(socket.id, nickname, roomCode, true);

        db.run(
          `INSERT INTO minigame (name, minigame_id, current_minigame, room_id) VALUES ('', '', 0, ?)`,
          [roomCode],
          (err) => {
            if (err) {
              console.error('createRoom.ts: Minigame Insert');
              console.error(err.message);
            }
            resolve();
          }
        );
      }).then(async () => {
        socket.join(roomCode);

        socket.nsp.to(socket.id).emit('can_join');
      });
    }
  );
};
