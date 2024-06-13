import { Socket } from 'socket.io';
import { userType } from '../Types/userType';
import Peer from 'peerjs';

import { newPeerConnection } from './PeerFunctions/newPeerConnection';

export const peerConnection = (socket: any, users: userType[]) => {
  const peer = new Peer(`${socket.id}`, {
    host: 'localhost',
    port: 9000,
    path: '/',
  });

  newPeerConnection(peer, socket, users);
};
