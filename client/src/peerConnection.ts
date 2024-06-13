import Peer from 'peerjs';
import { userType } from '../src/Types/userType';
import { socket } from '../src/socket';

export const peerConnection = (users: userType[]) => {
  const peer = new Peer(`${socket.id}`, {
    host: 'localhost',
    port: 9000,
    path: '/',
  });

  peer.on('open', function (id) {
    console.log('Connected to PeerJS server. Peer ID:', id);
  });

  peer.on('error', function (error) {
    console.error('Error connecting to PeerJS server:', error);
  });
};
