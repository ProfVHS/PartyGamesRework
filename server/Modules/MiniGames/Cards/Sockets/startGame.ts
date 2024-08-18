import { Socket } from 'socket.io';
import { generateCardsArray } from '../Functions/generateCardsArray';
import { getRoomData } from '../../../../Database/Room/getRoomData';

export const startGame = (socket: Socket) => {
  socket.on('start_game_cards', async (roomCode: string) => {
    const room = await getRoomData(roomCode);

    await generateCardsArray(room.round).then(async (cards) => {
      socket.nsp.to(roomCode).emit('update_cards', cards);
    });
  });
};
