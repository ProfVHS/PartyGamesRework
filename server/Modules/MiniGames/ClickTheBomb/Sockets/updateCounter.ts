import { db } from '../../../../Database/database';
import { Socket } from 'socket.io';
import { incrementCounter } from '../Functions/incrementCounter';
import { getClickTheBombData } from '../../../../Database/MiniGames/ClickTheBomb/getClickTheBombData';
import { updateAliveUser } from '../../../User/Functions/updateAliveUser';
import { getAliveUsersData } from '../../../../Database/Users/getAliveUsersData';
import { changeUserTurn } from '../../MiniGamesPlay/Functions/changeUserTurn';
import { createMaxClicks } from '../Functions/createMaxClicks';

export const updateCounter = async (socket: Socket) => {
  socket.on('update_counter_click_the_bomb', async (roomCode) => {
    await incrementCounter(roomCode);

    await getClickTheBombData(roomCode).then(async (bomb) => {
      if (bomb.counter == bomb.max) {
        await updateAliveUser(socket.id, false);

        const aliveUsers = await getAliveUsersData(roomCode);

        if (aliveUsers.length == 1) {
          const winner = aliveUsers[0];
          console.log(winner);
          return;
        }

        await changeUserTurn(socket, roomCode);

        await createMaxClicks(roomCode).then(async (maxClicks) => {
          await new Promise<void>((resolve, reject) => {
            db.run(
              'UPDATE click_the_bomb SET counter = 0, max = ? WHERE id = ?',
              [maxClicks, roomCode],
              (err) => {
                if (err) {
                  console.error('updateCounter.ts ClickTheBomb');
                  console.error(err.message);
                  reject(err);
                } else {
                  socket.nsp.to(roomCode).emit('update_bomb', {
                    id: roomCode,
                    counter: 0,
                    max: maxClicks,
                  });

                  resolve();
                }
              }
            );
          });
        });
      } else {
        socket.nsp.to(roomCode).emit('update_bomb', bomb);
      }
    });
  });
};
