import { Socket } from 'socket.io';
import { db } from '../../../Database/database';

export const joinRoom = async (socket: Socket) => {
  socket.on('join_room', async (roomCode, nickname) => {
    new Promise((reject) => {});
  });
};
