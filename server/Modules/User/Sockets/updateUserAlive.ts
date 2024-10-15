import { db } from '../../../Database/database';
import { Socket } from 'socket.io';
import { sendUsersData } from '../Functions/sendUsersData';
import { updateAliveUser } from '../Functions/updateAliveUser';
import { updateUserPositionInGame } from '../Functions/updateUserPositionInGame';

export const updateUserAlive = async (socket: Socket) => {
  socket.on('update_user_alive', async (roomCode: string, alive: boolean) => {
    await new Promise<void>((resolve) => {
      db.get(
        `SELECT MIN(position_in_game) as lastPosition FROM users WHERE room_id = ? AND position_in_game > 1`,
        [roomCode],
        (err: Error, rows: { lastPosition: number }) => {
          if (err) {
            console.error('updateUserAlive.ts');
            console.error(err.message);
          } else {
            const lastPostion = !rows.lastPosition ? 8 : rows.lastPosition - 1;
            console.log(lastPostion);
            updateUserPositionInGame(socket.id, lastPostion);
            resolve();
          }
        }
      );
    });

    await updateAliveUser(socket.id, alive).then(() => {
      sendUsersData(socket, roomCode);
    });
  });
};
