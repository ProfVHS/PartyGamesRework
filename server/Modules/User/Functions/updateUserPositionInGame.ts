import { db } from '../../../Database/database';

export const updateUserPositionInGame = async (
  userId: string,
  position: number
) => {
  await new Promise<void>((resolve) => {
    db.run(
      `UPDATE users SET position_in_game = ? WHERE id = ?`,
      [position, userId],
      (err) => {
        if (err) {
          console.error('updateUserPositionInGame.ts');
          console.error(err.message);
        } else {
          resolve();
        }
      }
    );
  });
};
