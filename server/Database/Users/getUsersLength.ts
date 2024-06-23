import { userType } from '../../Types/userType';
import { db } from '../database';

export const getUsersLength = async (roomCode: string) => {
  const usersLength: number = await new Promise<number>((resolve) => {
    db.all(
      `SELECT * FROM users WHERE room_id = ?`,
      [roomCode],
      (err: Error, rows: userType[]) => {
        if (err) {
          console.error('getUsersLength.ts: Users Select');
          console.error(err.message);
        } else {
          resolve(rows.length);
        }
      }
    );
  });

  return usersLength;
};
