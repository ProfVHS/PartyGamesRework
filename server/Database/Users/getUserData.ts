import { db } from '../../Database/database';
import { userType } from '../../Types/userType';

export const getUserData = async (userId: string) => {
  const user = await new Promise<userType>((resolve) => {
    db.get(
      `SELECT * FROM users WHERE id = ?`,
      [userId],
      (err: Error, row: userType) => {
        if (err) {
          console.error('getUserData.ts: Select');
          console.error(err.message);
        } else {
          resolve(row);
        }
      }
    );
  });

  return user;
};
