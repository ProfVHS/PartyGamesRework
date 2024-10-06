import { db } from '../../../Database/database';

export const updateReadyUsers = async (roomCode: string, ready: boolean) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET ready = ? WHERE room_id = ?`,
      [ready, roomCode],
      (err: Error) => {
        if (err) {
          console.error('updateReadyUsers.ts: Update users ready');
          console.error(err.message);
          reject();
        }
        resolve();
      }
    );
  });
};
