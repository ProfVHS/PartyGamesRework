import { useEffect, useState, useRef, useContext } from 'react';
import { Camera } from '../../components/features/camera/Camera';
import { Lobby } from '../../components/features/lobby/Lobby';
import './Room.scss';
import { socket } from '../../socket';
import { userType } from '../../Types/userType';
import { roomCodeContext } from '../../useContext/roomCodeContext';

export const RoomPage = () => {
  const [users, setUsers] = useState<userType[]>([]);
  const [room, setRoom] = useState<roomType>({ id: '' });

  const onceDone = useRef(false);

  useEffect(() => {
    if (onceDone.current) return;

    socket.emit('get_users');
    socket.emit('get_room');

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('update_users', (data: userType[]) => {
      console.log('Users Updated', data);
      setUsers(() => data);
    });

    socket.on('update_room', (data: roomType) => {
      console.log('Room updated', data);
      setRoom(() => data);
    });

    return () => {
      socket.off('update_users');
      socket.off('update_room');
    };
  }, [socket]);

  return (
    <div className="room">
      <div className="room__grid">
        {users.map((user) => (
          <Camera key={user.id} nickname={user.nickname} score={user.score} />
        ))}
        <div className="room__content">
          <Lobby />
        </div>
      </div>
    </div>
  );
};
