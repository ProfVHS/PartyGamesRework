import { db } from '../../../Database/database';
import { Socket } from 'socket.io';

export const checkUserInRoom = async (socket: Socket) => {
  socket.on('check_user_in_room', async () => {
    const userId = socket.id;

    await new Promise<void>((resolve) => {
      db.get(`SELECT * FROM users WHERE id = ?`, [userId], (err, row) => {
        if (err) {
          console.log(err);
        }
        if (!row) {
          console.log('User not found');
          socket.nsp.to(userId).emit('back_to_lobby');
          resolve();
        }
      });
    });
  });
};
