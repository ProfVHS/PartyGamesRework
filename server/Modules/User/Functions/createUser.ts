import { db } from '../../../Database/database';

export const createUser = async (
  id: string,
  nickname: string,
  room_id: string,
  isHost: boolean
) => {
  await new Promise<void>((resolve) => {
    db.run(
      `INSERT INTO users (id, nickname, score, room_id, isHost, position_in_room, alive, isDisconnected) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, nickname, 100, room_id, isHost, 1, true, false],
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
