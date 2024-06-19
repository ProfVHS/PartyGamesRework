import { Socket } from 'socket.io';

export const disconnectUser = async (socket: Socket, userId: string) => {
  socket.on('disconnect', () => {
    console.log('User Disconnected, disconnect');
  });
};
