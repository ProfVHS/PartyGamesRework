import { Socket } from 'socket.io';
import { db } from '../database';

export const sendRoomData = async (socket: Socket, roomCode: string) => {
  await new Promise(() => {
    db.get(`SELECT * FROM rooms WHERE id = ?`, [roomCode], (err, rows) => {
      if (err) {
        console.error('sendRoomData.ts: Room Select');
        console.error(err.message);
      } else {
        console.log(rows);
        socket.nsp.to(roomCode).emit('update_room', rows);
      }
    });
  });
};
