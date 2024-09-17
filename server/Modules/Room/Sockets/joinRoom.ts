import { Socket } from 'socket.io';

import { createUser } from '../../User/Functions/createUser';
import { getUsersLength } from '../../../Database/Users/getUsersLength';

import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';
import { getRoomData } from '../../../Database/Room/getRoomData';

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

    const roomInGame = await getRoomData(roomCode);

    if (roomInGame.in_game) {
      socket.nsp.to(socket.id).emit('cannot_join', 'Game in progress');
      return;
    }

    await new Promise<void>(async (resolve) => {
      await createUser(socket.id, nickname, roomCode, false);

      socket.join(roomCode);

      socket.nsp.to(socket.id).emit('can_join');

      resolve();
    });
  });
};
