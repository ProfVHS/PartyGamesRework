import { db } from '../../../../Database/database';
import { getUsersLength } from '../../../../Database/Users/getUsersLength';

export const randomUserTurn = async (roomCode: string) => {
  const usersLenght = await getUsersLength(roomCode);

  const randomUser = Math.floor(Math.random() * usersLenght) + 1;

  await new Promise<void>((resolve, reject) => {
    db.run(
      `UPDATE rooms SET turn = ? WHERE id = ?`,
      [randomUser, roomCode],
      (err: Error) => {
        if (err) {
          console.error('randomUserTurn.ts');
          console.error(err.message);
          reject(err);
        }

        resolve();
      }
    );
  });
};
