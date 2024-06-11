import { useEffect, useState } from 'react';
import { Camera } from '../../components/features/camera/Camera';
import './Room.scss';
import Peer from 'peerjs';
import { socket } from '../../socket';

export const RoomPage = () => {
  const [users, setUsers] = useState<string[]>([]);

  const peer = new Peer('Peer-id', {
    host: 'localhost',
    port: 9000,
    path: '/',
  });

  return (
    <div className="room">
      <div className="room__grid">
        {users.map((user) => (
          <Camera nickname={user} score={0} />
        ))}
        <div className="room__content"></div>
      </div>
    </div>
  );
};
