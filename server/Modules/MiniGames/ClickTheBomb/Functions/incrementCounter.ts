import { db } from '../../../../Database/database';

export const incrementCounter = async (roomCode: string) => {
  await new Promise<void>((resolve, reject) => {
    db.run(
      'UPDATE click_the_bomb SET counter = counter + 1 WHERE id = ?',
      [roomCode],
      (err) => {
        if (err) {
          console.error('incrementCounter.ts ClickTheBomb');
          console.error(err.message);
          return reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};
