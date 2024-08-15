import { userType } from '../../Types/userType';
import { db } from '../database';

export const getAliveUsersLength = async (roomCode: string) => {
  const aliveUsersLength: number = await new Promise<number>((resolve) => {
    db.all(
      `SELECT * FROM users WHERE room_id = ?`,
      [roomCode],
      (err: Error, rows: userType[]) => {
        if (err) {
          console.error('getAliveUsersLength.ts: Users Select');
          console.error(err.message);
        } else {
          resolve(rows.length);
        }
      }
    );
  });

  return aliveUsersLength;
};
