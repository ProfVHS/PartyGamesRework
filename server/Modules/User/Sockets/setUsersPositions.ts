import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { userType } from '../../../Types/userType';

export const setUsersPositions = (socket: Socket) => {
  socket.on('update_users_position_in_room', async (roomCode: string) => {
    await new Promise<void>((resolve) => {
      db.all(
        'SELECT * FROM users WHERE room_id = ?',
        [roomCode],
        (err: Error, users: userType[]) => {
          if (err) {
            console.error('setUsersPositions.ts SELECT');
            console.error(err.message);
            return;
          }

          users.forEach((row: userType, index) => {
            db.run(
              'UPDATE users SET position_in_room = ? WHERE id = ?',
              [index + 1, row.id],
              (err) => {
                if (err) {
                  console.error('setUsersPositions.ts UPDATE');
                  console.error(err.message);
                }
              }
            );
          });

          resolve();
        }
      );
    }).then(() => {
      db.all(
        `SELECT * FROM users WHERE room_id = ?`,
        [roomCode],
        (err, users) => {
          if (err) {
            console.error('setUsersPositions.ts SELECT');
            console.error(err.message);
            return;
          }
        }
      );
    });
  });
};
