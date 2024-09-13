import { Socket } from 'socket.io';
import { db } from '../../../Database/database';

export const updateInGameRoom = async (socket: Socket) => {
  socket.on(
    'update_in_game_status',
    async (roomId: string, inGame: boolean) => {
      await new Promise<void>((resolve, reject) => {
        db.run(
          `UPDATE rooms SET in_game = ? WHERE id = ?`,
          [inGame, roomId],
          (err: Error) => {
            if (err) {
              console.error('updateInGameRoom.ts: Update in_game');
              console.error(err.message);
              return reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    }
  );
};
