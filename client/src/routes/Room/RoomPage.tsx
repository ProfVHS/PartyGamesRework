import { useEffect, useState } from 'react';
import { Camera } from '../../components/features/camera/Camera';
import './Room.scss';
import Peer from 'peerjs';
import { socket } from '../../socket';
import { userType } from '../../Types/userType';

export const RoomPage = () => {
  const [users, setUsers] = useState<userType[]>([]);

  const peer = new Peer('Peer-id', {
    host: 'localhost',
    port: 9000,
    path: '/',
  });

  useEffect(() => {
    socket.on('update_users', (data: userType[]) => {
      console.log('User joined', data);
      setUsers(() => data);
    });

    socket.on('test', () => {
      console.log('Test');
    });

    socket.on('room_exists', (data: string) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="room">
      <div className="room__grid">
        {users.map((user) => (
          <Camera key={user.id} nickname={user.nickname} score={user.score} />
        ))}
        <div className="room__content"></div>
      </div>
    </div>
  );
};
