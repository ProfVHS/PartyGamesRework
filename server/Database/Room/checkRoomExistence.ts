import { db } from '../database';

export const checkRoomExistence = async (roomCode: string) => {
  return await new Promise<boolean>((resolve) => {
    db.get(`SELECT * FROM rooms WHERE id = ?`, [roomCode], (err, row) => {
      if (err) {
        console.error('createRoom.ts: Room Select');
        console.error(err.message);
      } else {
        if (row) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};
