import { Socket } from 'socket.io';

export const disconnectUser = async (socket: Socket) => {
  socket.on('disconnect', async () => {
    console.log('User Disconnected, disconnect');
  });
};
