import { Socket } from 'socket.io';
import { sendUsersData } from './Sockets/sendUsersData';

export const usersModule = (socket: Socket) => {
  sendUsersData(socket);
};
