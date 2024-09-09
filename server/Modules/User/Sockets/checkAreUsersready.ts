import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { sendUsersData } from '../Functions/sendUsersData';

export const checkAreUsersReady = (socket: Socket) => {
  socket.on('check_are_users_ready', async (roomCode: string) => {
    console.log('check_are_users_ready', socket.id);

    await new Promise<void>((resolve, reject) => {
      db.run(
        `UPDATE users SET ready = 1 WHERE id = ?`,
        [socket.id],
        (err: Error) => {
          if (err) {
            console.error('checkAreUsersReady.ts: Update user');
            console.error(err.message);
            reject();
          }
          resolve();
        }
      );
    }).then(async () => {
      await sendUsersData(socket, roomCode);
    });
  });
};
