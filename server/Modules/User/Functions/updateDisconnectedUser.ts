import { db } from '../../../Database/database';

export const updateDisconnectedUser = async (
  userId: string,
  isDisconnected: boolean
) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE users SET isDisconnected = ? WHERE id = ?`,
      [isDisconnected, userId],
      (err: Error) => {
        if (err) {
          console.error('updateDisconnectedUser.ts: Update Disconnected');
          console.error(err.message);
          return reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
