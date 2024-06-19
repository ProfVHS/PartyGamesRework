import { Socket } from 'socket.io';

export const forceDisconnectUser = async (socket: Socket, userId: string) => {
  socket.on('force_disconnect_user', () => {
    console.log('User Disconnected, force');
  });
};
