import { Socket } from 'socket.io';
import { usersData } from './Sockets/usersData';
import { checkUserInRoom } from './Sockets/checkUserInRoom';
import { forceDisconnectUser } from './Sockets/forceDisconnectUser';
import { disconnectUser } from './Sockets/disconnectUser';
import { setUsersPositions } from './Sockets/setUsersPositions';
import { checkAreUsersReady } from './Sockets/checkAreUsersready';

export const usersModule = (socket: Socket) => {
  usersData(socket);
  checkUserInRoom(socket);
  checkAreUsersReady(socket);
  setUsersPositions(socket);
  forceDisconnectUser(socket);
  disconnectUser(socket);
};
