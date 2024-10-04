import { db } from '../../../../Database/database';

export const deleteClickTheBomb = async (roomCode: string) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `DELETE click_the_bomb WHERE room_id = ?`,
      [roomCode],
      (err: Error) => {
        if (err) {
          console.log('deleteClickTheBomb.ts DELETE');
          console.error(err);
          reject();
        }
        resolve();
      }
    );
  });
};
