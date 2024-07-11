import { db } from '../../../Database/database';

export const createUser = async (
  id: string,
  nickname: string,
  score: number,
  room_id: string,
  isHost: boolean,
  position_in_room: number
) => {
  await new Promise<void>((resolve) => {
    db.run(
      `INSERT INTO users (id, nickname, score, room_id, isHost, position_in_room) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, nickname, score, room_id, isHost, position_in_room],
      (err) => {
        if (err) {
          console.error('createUser.ts');
          console.error(err.message);
        } else {
          resolve();
        }
      }
    );
  });
};
