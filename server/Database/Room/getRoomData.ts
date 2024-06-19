import { db } from '../database';
import { roomType } from '../../Types/roomType';

export const getRoomData = async (roomCode: string) => {
  const room: roomType = await new Promise((resolve) => {
    db.get(
      `SELECT * FROM rooms WHERE id = ?`,
      [roomCode],
      (err: Error, rows: roomType) => {
        if (err) {
          console.error('sendRoomData.ts: Room Select');
          console.error(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });

  return room;
};
