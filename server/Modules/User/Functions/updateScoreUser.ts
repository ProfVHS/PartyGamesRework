import { db } from '../../../Database/database';

export const updateScoreUser = async (id: string, score: number) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET score = ? WHERE id = ?`,
      [score, id],
      (err: Error) => {
        if (err) {
          console.error('updateScoreUser.ts: Update Score');
          console.error(err.message);
          return reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
