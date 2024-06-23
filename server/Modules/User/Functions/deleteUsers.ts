import { db } from '../../../Database/database';

export const deleteUsers = async (roomCode: string) => {
  await new Promise<void>((resolve) => {
    db.run(`DELETE FROM users WHERE room_id = ?`, [roomCode], (err) => {
      if (err) {
        console.error('deleteUsers.ts Users Delete');
        console.error(err.message);
      }
      resolve();
    });
  });
};
