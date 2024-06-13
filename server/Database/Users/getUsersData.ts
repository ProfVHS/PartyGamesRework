import { db } from '../database';
import { userType } from '../../Types/userType';

export const getUsersData = async (roomCode: string) => {
  const users = await new Promise<userType[]>((resolve) => {
    db.all(
      `SELECT * FROM users WHERE room_id = ?`,
      [roomCode],
      (err: Error, rows: userType[]) => {
        if (err) {
          console.error('getAllUsers.ts: Users Select');
          console.error(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return users;
};
