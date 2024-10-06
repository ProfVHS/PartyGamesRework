import { db } from '../../../../Database/database';
import { Socket } from 'socket.io';
import { incrementCounter } from '../Functions/incrementCounter';
import { getClickTheBombData } from '../../../../Database/MiniGames/ClickTheBomb/getClickTheBombData';
import { updateAliveUser } from '../../../User/Functions/updateAliveUser';
import { getAliveUsersData } from '../../../../Database/Users/getAliveUsersData';
import { changeUserTurn } from '../../MiniGamesPlay/Functions/changeUserTurn';
import { createMaxClicks } from '../Functions/createMaxClicks';
import { addScoreUser } from '../../../User/Functions/addScoreUser';
import { sendUsersData } from '../../../User/Functions/sendUsersData';
import { deleteClickTheBomb } from '../Functions/deleteClickTheBomb';

export const updateCounter = async (socket: Socket) => {
  socket.on('update_counter_click_the_bomb', async (roomCode) => {
    await incrementCounter(roomCode);

    await getClickTheBombData(roomCode).then(async (bomb) => {
      if (bomb.counter == bomb.max) {
        await updateAliveUser(socket.id, false);

        await addScoreUser(socket.id, -40);

        const aliveUsers = await getAliveUsersData(roomCode);

        if (aliveUsers.length == 1) {
          const winner = aliveUsers[0];

          await addScoreUser(winner.id, 50);

          await deleteClickTheBomb(roomCode);

          socket.nsp.to(roomCode).emit('start_new_game');
        } else {
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
                    return reject(err);
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
        }

        await sendUsersData(socket, roomCode);
      } else {
        socket.nsp.to(roomCode).emit('update_bomb', bomb);

        await addScoreUser(socket.id, 15);

        await sendUsersData(socket, roomCode);
      }
    });
  });
};
