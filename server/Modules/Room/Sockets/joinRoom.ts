import { Socket } from 'socket.io';

import { createUser } from '../../User/Functions/createUser';
import { getUserData } from '../../../Database/Users/getUserData';
import { getUsersLength } from '../../../Database/Users/getUsersLength';

import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';
import { getRoomData } from '../../../Database/Room/getRoomData';

import { db } from '../../../Database/database';
import { updateDisconnectedUser } from '../../User/Functions/updateDisconnectedUser';

export const joinRoom = async (socket: Socket) => {
  socket.on(
    'join_room',
    async (roomCode: string, nickname: string, prevUserId: string) => {
      const user = await getUserData(prevUserId);

      if (user) {
        // connect to the same room
        if (user.room_id === roomCode) {
          socket.join(roomCode);

          await updateDisconnectedUser(user.id, false);

          await new Promise<void>((resolve, reject) => {
            db.run(
              `UPDATE users SET id = ? WHERE id = ?`,
              [socket.id, prevUserId],
              (err: Error) => {
                if (err) {
                  console.error('joinRoom.ts: Update Socket Id');
                  console.error(err.message);
                  return reject(err);
                } else {
                  resolve();
                }
              }
            );
          });

          socket.nsp.to(socket.id).emit('can_join');
          return;
        }

        // connect to another room
        if (user.room_id !== roomCode) {
          socket.nsp
            .to(socket.id)
            .emit('cannot_join', 'You are already in other room');
          return;
        }
      } else {
        // check if room exists
        const roomExistence: boolean = (
          await checkRoomExistence(roomCode)
        ).valueOf();

        if (!roomExistence) {
          socket.nsp.to(socket.id).emit('cannot_join', 'Room not found');
          return;
        }

        // check if room is full
        const usersInRoom: number = await getUsersLength(roomCode);

        if (usersInRoom >= 8) {
          socket.nsp.to(socket.id).emit('cannot_join', 'Room is full');
          return;
        }

        // check if game is in progress
        const roomInGame = await getRoomData(roomCode);

        if (roomInGame.in_game) {
          socket.nsp.to(socket.id).emit('cannot_join', 'Game in progress');
          return;
        }
      }

      await new Promise<void>(async (resolve) => {
        await createUser(socket.id, nickname, roomCode, false);

        socket.join(roomCode);

        socket.nsp.to(socket.id).emit('can_join');

        resolve();
      });
    }
  );
};
