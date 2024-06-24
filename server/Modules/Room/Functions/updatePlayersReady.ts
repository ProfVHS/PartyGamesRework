import { db } from '../../../Database/database';

export const updatePlayersReady = async (
  roomCode: string,
  readyValue: number
) => {
  await new Promise<void>((resolve) => {
    db.run(
      `UPDATE rooms SET players_ready = players_ready + ? WHERE id = ?`,
      [readyValue, roomCode],
      (err) => {
        if (err) {
          console.error('updatePlayersReady.ts PlayersReady Update Error:');
          console.error(err.message);
        }
        resolve();
      }
    );
  });
};
