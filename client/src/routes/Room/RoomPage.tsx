import { useEffect, useState, useRef } from 'react';
import { Camera } from '../../components/features/camera/Camera';
import { Lobby } from '../../components/features/lobby/Lobby';
import './Room.scss';
import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom';
import { roomDataContext } from '../../useContext/roomDataContext';
import { usersDataContext } from '../../useContext/usersDataContext';
import { clientDataContext } from '../../useContext/clientDataContext';

export const RoomPage = () => {
  const navigator = useNavigate();
  const [room, setRoom] = useState<roomType>();
  const [users, setUsers] = useState<userType[]>([]);
  const [client, setClient] = useState<userType>();
  const [minigames, setMinigames] = useState<Minigame[]>([]);

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
      const clientData = data.find((user) => user.id === socket.id);
      setClient(() => clientData);
    });

    socket.on('update_room', (data: roomType) => {
      console.log('Room updated', data);
      setRoom(() => data);
    });

    socket.on('update_miniGamesArray', (data: Minigame[]) => {
      console.log('Minigames updated', data);
      setMinigames(() => data);
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
      socket.off('update_miniGamesArray');
      socket.off('back_to_lobby');
      socket.off('disconnect');
    };
  }, [socket]);

  useEffect(() => {
    if (room?.players_ready === users.length && users.length > 1) {
      if (!client?.isHost) return;

      if (minigames.length == 0)
        socket.emit('create_miniGamesArray', room.id, [], 2);

      console.log('All players ready');
    }
  }, [room?.players_ready]);

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
          <usersDataContext.Provider value={users}>
            <clientDataContext.Provider value={client}>
              <div className="room__content">
                <Lobby />
              </div>
            </clientDataContext.Provider>
          </usersDataContext.Provider>
        </roomDataContext.Provider>
      </div>
    </div>
  );
};
