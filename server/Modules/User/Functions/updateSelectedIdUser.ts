import { db } from '../../../Database/database';

export const updateSelectedIdUser = async (
  userId: string,
  selectedId: number
) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET selected_id = ? WHERE id = ?`,
      [selectedId, userId],
      (err) => {
        if (err) {
          console.error('updateSelectedIdUser.ts: Update selected_id');
          console.error(err.message);
          return reject();
        }
        resolve();
      }
    );
  });
};
