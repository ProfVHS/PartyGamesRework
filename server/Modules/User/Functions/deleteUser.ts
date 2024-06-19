import { db } from '../../../Database/database';

export const deleteUser = async (id: string) => {
  await new Promise<void>((resolve) => {
    db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
      if (err) {
        console.error('deleteUser.ts User Delete');
        console.error(err.message);
      }
      resolve();
    });
  });
};
