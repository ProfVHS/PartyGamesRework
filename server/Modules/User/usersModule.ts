import { Socket } from 'socket.io';
import { sendUsersData } from './Sockets/sendUsersData';
import { checkUserInRoom } from './Sockets/checkUserInRoom';
import { forceDisconnectUser } from './Sockets/forceDisconnectUser';
import { disconnectUser } from './Sockets/disconnectUser';

export const usersModule = (socket: Socket) => {
  sendUsersData(socket);
  checkUserInRoom(socket);
  forceDisconnectUser(socket);
  disconnectUser(socket);
};
