import { Socket } from 'socket.io';
import { db } from '../../../Database/database';

export const createRoom = async (socket: Socket) => {
  socket.on('create_room', async (roomCode, nickname) => {
    new Promise((reject) => {});
  });
};
