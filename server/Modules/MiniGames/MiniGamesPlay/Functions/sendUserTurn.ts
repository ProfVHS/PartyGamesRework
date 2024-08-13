import { db } from '../../../../Database/database';
import { Socket } from 'socket.io';

export const sendUserTurn = async (socket: Socket, roomCode: string) => {
  await new Promise<void>((resolve, reject) => {
    db.get(
      'SELECT turn FROM rooms WHERE id = ?',
      [roomCode],
      (err: Error, row: { turn: number }) => {
        if (err) {
          console.error('sendUserTurn.ts');
          console.error(err.message);
          reject(err);
        }

        db.get(
          'SELECT * FROM users WHERE position_in_room = ?',
          [row.turn],
          (err: Error, user: { nickname: string }) => {
            if (err) {
              console.error('sendUserTurn.ts SELECT User');
              console.error(err.message);
              reject(err);
            }

            socket.nsp.to(roomCode).emit('update_turn', user);

            resolve();
          }
        );
      }
    );
  });
};
