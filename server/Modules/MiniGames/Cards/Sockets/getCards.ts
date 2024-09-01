import { Socket } from 'socket.io';
import { db } from '../../../../Database/database';
import { CardsType } from '../../../../Types/cardsType';

export const getCards = (socket: Socket) => {
  socket.on('get_cards', async (roomCode: string) => {
    await new Promise<void>((resolve, reject) => {
      db.all(
        `SELECT card_id as id, score, isPossitive FROM cards WHERE room_id = ?`,
        [roomCode],
        (err: Error, rows: CardsType[]) => {
          if (err) {
            console.error('getCards.ts: getCards');
            console.error(err.message);
            reject(err);
          }

          socket.nsp.to(socket.id).emit('update_cards', rows);
          resolve();
        }
      );
    });
  });
};
