import { useEffect, useState } from 'react';
import { Camera } from '../../components/features/camera/Camera';
import './Room.scss';
import Peer from 'peerjs';
import { socket } from '../../socket';
import { userType } from '../../Types/userType';
import { roomCodeContext } from '../../useContext/roomCodeContext';

export const RoomPage = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [roomCode, setRoomCode] = useState<string>('');

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

    socket.on('update_room', (data: roomType) => {
      setRoomCode(() => data.id);
    });

    socket.on('test', () => {
      console.log('Test');
    });
  }, []);

  return (
    <div className="room">
      <div className="room__grid">
        {users.map((user) => (
          <Camera key={user.id} nickname={user.nickname} score={user.score} />
        ))}
        <roomCodeContext.Provider value={roomCode}>
          <div className="room__content">{roomCode}</div>
        </roomCodeContext.Provider>
      </div>
    </div>
  );
};
