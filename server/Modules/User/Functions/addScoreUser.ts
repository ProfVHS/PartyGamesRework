import { db } from '../../../Database/database';
import { getUserData } from '../../../Database/Users/getUserData';

export const addScoreUser = async (userId: string, score: number) => {
  const user = await getUserData(userId);
  let scoreToSet = Math.round(user.score + score);

  await new Promise<void>((resolve, reject) => {
    if (user.isDisconnected) return resolve();

    if (scoreToSet <= 0) {
      scoreToSet = 0;
    }

    db.run(
      `UPDATE users SET score = ? WHERE id = ?`,
      [scoreToSet, userId],
      (err: Error) => {
        if (err) {
          console.error('addScoreUser.ts: Add Score');
          console.error(err.message);
          return reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
