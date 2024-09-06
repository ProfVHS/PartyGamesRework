import { Socket } from 'socket.io';
import { db } from '../../../../Database/database';
import { generateCardsArray } from '../Functions/generateCardsArray';
import { getRoomData } from '../../../../Database/Room/getRoomData';
import { sendRoomData } from '../../../../Modules/Room/Functions/sendRoomData';

export const startGame = (socket: Socket) => {
  socket.on('start_game_cards', async (roomCode: string) => {
    const room = await getRoomData(roomCode);

    const cards = await new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM cards WHERE room_id = ?`,
        [room.id],
        (err, rows) => {
          if (err) {
            console.log('startGame.ts: Select cards');
            console.log(err.message);
            reject(err);
          }

          resolve(rows);
        }
      );
    });

    if (room.round > 2) {
      console.log('End of the game', socket.id);
      return;
    }

    if (cards) {
      await new Promise<void>((resolve, reject) => {
        db.serialize(() => {
          db.run(
            `DELETE FROM cards WHERE room_id = ?`,
            [room.id],
            (err: Error) => {
              if (err) {
                console.log('startGame.ts: Delete cards');
                console.log(err.message);
                reject(err);
              }

              resolve();
            }
          );
          db.run(
            `UPDATE rooms SET round = round + 1 WHERE id = ?`,
            [room.id],
            (err: Error) => {
              if (err) {
                console.log('startGame.ts: Update round');
                console.log(err.message);
                reject(err);
              }
              resolve();
            }
          );
        });
      }).then(async () => {
        await generateCardsArray(room.id, room.round).then(async (cards) => {
          sendRoomData(socket, roomCode);
          socket.nsp.to(roomCode).emit('update_cards', cards);
        });
      });
    }
  });
};
