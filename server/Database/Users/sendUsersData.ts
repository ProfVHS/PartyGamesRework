import { Socket } from 'socket.io';
import { db } from '../database';

export const sendUsersData = async (socket: Socket, roomCode: string) => {
  db.all(`SELECT * FROM users WHERE room_id = ?`, [roomCode], (err, rows) => {
    if (err) {
      console.error('getAllUsers.ts: Users Select');
      console.error(err.message);
    } else {
      socket.nsp.to(roomCode).emit('update_users', rows);
    }
  });
};
