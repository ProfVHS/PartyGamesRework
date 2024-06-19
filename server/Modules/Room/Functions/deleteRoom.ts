import { db } from '../../../Database/database';

export const deleteRoom = async (roomId: string) => {
  await new Promise<void>((resolve) => {
    db.run(`DELETE FROM rooms WHERE id = ?`, [roomId], (err) => {
      if (err) {
        console.error('deleteRoom.ts Room Delete');
        console.error(err.message);
      }
      resolve();
    });
  });
};
