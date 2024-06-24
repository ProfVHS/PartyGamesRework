import { useEffect, useState, useRef } from 'react';
import { Camera } from '../../components/features/camera/Camera';
import { Lobby } from '../../components/features/lobby/Lobby';
import './Room.scss';
import { socket } from '../../socket';
import { userType } from '../../Types/userType';
import { roomDataContext } from '../../useContext/roomDataContext';
import { useNavigate } from 'react-router-dom';

export const RoomPage = () => {
  const navigator = useNavigate();
  const [users, setUsers] = useState<userType[]>([]);
  const [room, setRoom] = useState<roomType>();

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

    socket.on('back_to_lobby', () => {
      navigator('/');
    });

    socket.on('disconnect', () => {
      const date = new Date();
      console.log('Disconnected from server', date);
    });

    return () => {
      socket.off('update_users');
      socket.off('update_room');
      socket.off('back_to_lobby');
      socket.off('disconnect');
    };
  }, [socket]);

  useEffect(() => {
    if (users.length === 0 || room === null) {
      socket.emit('check_user_in_room');
    }
  }, []);

  return (
    <div className="room">
      <div className="room__grid">
        {users.map((user) => (
          <Camera key={user.id} nickname={user.nickname} score={user.score} />
        ))}
        <roomDataContext.Provider value={room}>
          <div className="room__content">
            <Lobby />
          </div>
        </roomDataContext.Provider>
      </div>
    </div>
  );
};
