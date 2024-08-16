import { Socket } from 'socket.io';
import { generateCardsArray } from '../Functions/generateCardsArray';

export const startGame = (socket: Socket) => {
  socket.on('start_game_cards', async () => {
    await generateCardsArray(3).then(async (cards) => {
      console.log('Cards generated', cards);
    });
  });
};
