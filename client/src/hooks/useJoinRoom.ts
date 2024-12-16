import { Socket } from 'socket.io-client';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { randomRoomCode } from '../utils/RandomRoomCode.ts';


export const useJoinRoom = (socket: Socket) => {
  const navigator = useNavigate();

  useEffect(() => {
    socket.on('cannot_join', (reason: string) => {
      if (reason === 'Room found') {
        const roomCode = randomRoomCode();

        socket.emit('create_room', roomCode);
      } else {
        alert(reason);
      }
    });

    socket.on('can_join', () => {
      navigator('/room');
    });

    return () => {
      socket.off('cannot_join');
      socket.off('can_join');
    };
  }, [navigator, socket]);
};
