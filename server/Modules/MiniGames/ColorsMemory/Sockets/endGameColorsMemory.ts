import { db } from '../../../../Database/database';
import { Socket } from 'socket.io';

import { userType } from '../../../../Types/userType';

import { addScoreUser } from '../../../User/Functions/addScoreUser';
import { updateAliveUsers } from '../../../User/Functions/updateAliveUsers';
import { sendUsersData } from '../../../User/Functions/sendUsersData';

export const endGameColorsMemory = async (socket: Socket) => {
  socket.on('end_game_colors_memory', async (roomCode: string) => {
    await updateAliveUsers(roomCode, true);

    const scoreArray = [100, 70, 50, 30];

    const playersByPosition = await new Promise<userType[]>((resolve) => {
      db.all(
        `SELECT * FROM users WHERE room_id = ? AND position_in_game > -1 ORDER BY position_in_game`,
        [roomCode],
        (err: Error, rows: userType[]) => {
          if (err) {
            console.error('endGameColorsMemory.ts');
            console.error(err.message);
          } else {
            resolve(rows);
          }
        }
      );
    });

    playersByPosition.forEach(async (player, index) => {
      if (index >= scoreArray.length) return;

      await addScoreUser(player.id, scoreArray[index]);

      if (playersByPosition.length - 1 === index) {
        await sendUsersData(socket, roomCode);

        socket.nsp.to(roomCode).emit('start_new_game');
      }
    });
  });
};
