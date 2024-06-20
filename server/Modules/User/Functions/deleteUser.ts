import { db } from '../../../Database/database';

export const deleteUser = async (userId: string) => {
  await new Promise<void>((resolve) => {
    db.run(`DELETE FROM users WHERE id = ?`, [userId], (err) => {
      if (err) {
        console.error('deleteUser.ts User Delete');
        console.error(err.message);
      }
      resolve();
    });
  });
};
