import { db } from '../../../Database/database';

export const addScoreUser = async (id: string, score: number) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET score = score + ? WHERE id = ?`,
      [score, id],
      (err: Error) => {
        if (err) {
          console.error('addScoreUser.ts: Add Score');
          console.error(err.message);
          reject();
        } else {
          resolve();
        }
      }
    );
  });
};
