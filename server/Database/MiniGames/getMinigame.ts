import { Minigame } from '../../Types/Minigame';
import { db } from '../database';

export const getMinigame = async (roomCode: string) => {
  return new Promise<Minigame>((resolve, reject) => {
    db.get(
      `SELECT current_minigame AS id, minigame_id, name FROM minigame WHERE room_id = ?`,
      [roomCode],
      (err: Error, row: Minigame) => {
        if (err) {
          console.error('getMinigame.ts: Select minigame');
          console.error(err.message);
          reject(err);
        }

        resolve(row);
      }
    );
  });
};
