import Peer from 'peerjs';
import { DataConnection } from 'peerjs';
import { Socket } from 'socket.io';
import { userType } from '../../Types/userType';

export const newPeerConnection = (
  peer: Peer,
  socket: Socket,
  users: userType[]
) => {
  peer.on('open', function (id) {
    console.log('Connected to PeerJS server. Peer ID:', id);
  });

  peer.on('error', function (error) {
    console.error('Error connecting to PeerJS server:', error);
  });

  const handleConnection = (conn: DataConnection) => {
    console.log('handleConnection');

    conn.on('open', () => {
      if (socket.id == users[0].id) {
        console.log('Wywoluje send');
        conn.send('hi!');
      }

      conn.on('data', (data) => {
        console.log(data);
      });
    });
  };

  peer.on('connection', (conn) => {
    handleConnection(conn);
  });

  // const myVideo = document.getElementById(
  //   `${socket.id}camera__video`
  // ) as HTMLVideoElement;

  // if (myVideo instanceof HTMLVideoElement) {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true })
  //       .then(function (stream) {
  //         myVideo.srcObject = stream;
  //         myVideo.play();
  //       })
  //       .catch(function (error) {
  //         console.error('Error accessing user media: ', error);
  //       });
  //   } else {
  //     console.warn('getUserMedia not supported on your browser!');
  //   }
  // }
};
