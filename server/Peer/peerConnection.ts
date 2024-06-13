import { Socket } from 'socket.io';
import { userType } from '../Types/userType';

import { newPeerConnection } from './PeerFunctions/newPeerConnection';

export const peerConnection = (socket: any, users: userType[]) => {
  newPeerConnection(socket, users);
};
