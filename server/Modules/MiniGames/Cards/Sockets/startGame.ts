import { Socket } from 'socket.io';

export const startGame = (socket: Socket) => {
  socket.on('start_game_cards', () => {
    console.log('startGamem cards');
  });
};
