import { db } from '../database';
import { userType } from '../../Types/userType';

export const getAliveUsersData = async (roomCode: string) => {
  const aliveUsers = await new Promise<userType[]>((resolve) => {
    db.all(
      `SELECT * FROM users WHERE room_id = ? AND alive = true`,
      [roomCode],
      (err: Error, rows: userType[]) => {
        if (err) {
          console.error('getAliveUsersData.ts: Users Select');
          console.error(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return aliveUsers;
};
