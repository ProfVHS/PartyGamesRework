import { Socket } from 'socket.io';
import { incrementCounter } from '../Functions/incrementCounter';
import { getClickTheBombData } from '../../../../Database/MiniGames/ClickTheBomb/getClickTheBombData';

export const updateCounter = async (socket: Socket) => {
  socket.on('update_counter_click_the_bomb', async (roomCode) => {
    await incrementCounter(roomCode);

    await getClickTheBombData(roomCode).then((bomb) => {
      socket.nsp.to(roomCode).emit('update_bomb', bomb);
    });
  });
};
