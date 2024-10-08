import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './Room.scss';

import { socket } from '../../socket';

import { clientDataContext } from '../../useContext/clientDataContext';
import { usersDataContext } from '../../useContext/usersDataContext';
import { roomDataContext } from '../../useContext/roomDataContext';
import { minigamesArrayContext } from '../../useContext/minigamesArrayContext';

import { Camera } from '../../components/features/camera/Camera';
import { Lobby } from '../../components/features/lobby/Lobby';
import { Minigame } from '../../components/Minigame/Minigame';

export const RoomPage = () => {
  const navigator = useNavigate();
  const [room, setRoom] = useState<roomType>();
  const [users, setUsers] = useState<userType[]>([]);
  const [client, setClient] = useState<userType>();
  const [minigames, setMinigames] = useState<Minigame[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('Lobby');

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

    socket.on('receive_minigamesArray', (data: Minigame[]) => {
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

    socket.on('host_left', () => {
      setGameStatus(() => 'HostLeft');
    });

    return () => {
      socket.off('update_users');
      socket.off('update_room');
      socket.off('receive_minigamesArray');
      socket.off('back_to_lobby');
      socket.off('disconnect');
      socket.off('host_left');
    };
  }, [socket]);

  useEffect(() => {
    if (room?.players_ready === users.length && users.length > 1) {
      setGameStatus(() => 'Minigames');

      if (!client?.isHost) return;

      socket.emit('update_users_position_in_room', room!.id);

      if (minigames.length == 0)
        socket.emit('create_miniGamesArray', room.id, [], 2);
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
          <Camera
            key={user.id}
            nickname={user.nickname}
            score={user.score}
            alive={user.alive}
            isDisconnected={user.isDisconnected}
          />
        ))}
        <roomDataContext.Provider value={room}>
          <usersDataContext.Provider value={users}>
            <clientDataContext.Provider value={client}>
              <minigamesArrayContext.Provider value={minigames}>
                <div className="room__content">
                  {gameStatus === 'Lobby' && <Lobby />}
                  {gameStatus === 'Minigames' &&
                    (minigames.length > 1 || !client?.isHost) && <Minigame />}
                  {gameStatus === 'HostLeft' && (
                    <>
                      <div>Host Left</div>
                      <button onClick={() => navigator('/')}>
                        Back to lobby
                      </button>
                    </>
                  )}
                </div>
              </minigamesArrayContext.Provider>
            </clientDataContext.Provider>
          </usersDataContext.Provider>
        </roomDataContext.Provider>
      </div>
    </div>
  );
};
