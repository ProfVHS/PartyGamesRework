import { db } from './../../database';
import { ClickTheBombType } from '../../../Types/clickthebombType';

export const getClickTheBombData = async (roomCode: string) => {
  const data = await new Promise<ClickTheBombType>((resolve, reject) => {
    db.get(
      'SELECT * FROM click_the_bomb WHERE id = ?',
      [roomCode],
      (err: Error, row: ClickTheBombType) => {
        if (err) {
          console.error('getClickTheBombData.ts');
          console.error(err.message);
          return reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });

  return data;
};
