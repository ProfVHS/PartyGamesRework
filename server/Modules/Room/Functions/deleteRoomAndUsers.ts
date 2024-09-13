import { db } from '../../../Database/database';

export const deleteRoomAndUsers = async (roomId: string) => {
  await new Promise<void>((resolve) => {
    db.run(`DELETE FROM rooms WHERE id = ?`, [roomId], (err) => {
      if (err) {
        console.error('deleteRoomAndUsers.ts Room Delete');
        console.error(err.message);
      }
      resolve();
    });
  });
};
