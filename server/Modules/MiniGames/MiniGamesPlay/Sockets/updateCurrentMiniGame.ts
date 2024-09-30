import { db } from '../../../../Database/database';
import { Socket } from 'socket.io';
import { Minigame } from '../../../../Types/Minigame';

export const updateCurrentMiniGame = async (socket: Socket) => {
  socket.on(
    'update_currentMinigame',
    async (roomCode: string, game: Minigame) => {
      await new Promise<void>((resolve, reject) => {
        db.run(
          `UPDATE minigame SET name = ?, minigame_id = ?, current_minigame = ? WHERE room_id = ?`,
          [game.name, game.minigame_id, game.id, roomCode],
          (err) => {
            if (err) {
              console.error('updateCurrentMiniGame.ts: Update minigame');
              console.error(err.message);
              reject(err);
            }
            resolve();
          }
        );
      });

      socket.nsp.to(roomCode).emit('receive_currentMinigame', game);
    }
  );
};
