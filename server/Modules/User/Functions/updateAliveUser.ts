import { db } from '../../../Database/database';

export const updateAliveUser = async (userId: string, alive: boolean) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET alive = ? WHERE id = ?`,
      [alive, userId],
      (err: Error) => {
        if (err) {
          console.error('updateAliveUser.ts');
          console.error(err.message);
          reject(err);
        }
        resolve();
      }
    );
  });
};
