import { db } from '../../../Database/database';

export const updateAliveUsers = async (roomCode: string, alive: boolean) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET alive = ? WHERE room_id = ?`,
      [alive, roomCode],
      (err: Error) => {
        if (err) {
          console.log('updateAliveUsers.ts: Update alive');
          console.log(err.message);
          reject(err);
        }

        resolve();
      }
    );
  });
};
