import { Socket } from 'socket.io';
import { db } from '../../../../Database/database';
import { createMaxClicks } from '../Functions/createMaxClicks';

export const startGame = (socket: Socket) => {
  socket.on('start_game_click_the_bomb', async (roomCode) => {
    await createMaxClicks(roomCode).then(async (maxClicks) => {
      await new Promise<void>((resolve, reject) => {
        db.run(
          'INSERT INTO click_the_bomb (id, counter, max) VALUES (?, 0, ?)',
          [roomCode, maxClicks],
          (err) => {
            if (err) {
              console.error('startGame.ts ClickTheBomb');
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
  });
};
