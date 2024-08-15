import { Socket } from 'socket.io';

export const updateSelectedCard = (socket: Socket) => {
  socket.on('update_selected_card', () => {
    console.log('update_selected_card');
  });
};
