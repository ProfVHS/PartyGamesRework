import { db } from '../../../../Database/database';

export const deleteCards = async (roomCode: string) => {
  await new Promise<void>((resolve, reject) => {
    db.run(`DELETE FROM cards WHERE room_id = ?`, [roomCode], (err: Error) => {
      if (err) {
        console.error('deleteCards.ts DELETE');
        console.error(err.message);
        reject();
      }
      resolve();
    });
  });
};
