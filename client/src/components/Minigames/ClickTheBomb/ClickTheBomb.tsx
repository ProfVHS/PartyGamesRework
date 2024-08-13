import { useContext, useEffect, useState, useRef } from 'react';
import { socket } from '../../../socket';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { clientDataContext } from '../../../useContext/clientDataContext';
import { usersDataContext } from '../../../useContext/usersDataContext';
import { ClickTheBombType } from '../../../Types/clickthebombType';

export const ClickTheBomb = () => {
  const room = useContext(roomDataContext);
  const client = useContext(clientDataContext);
  const users = useContext(usersDataContext);
  const [bomb, setBomb] = useState<ClickTheBombType | undefined>(undefined);
  const [userTurn, setUserTurn] = useState<userType | undefined>(undefined);
  const [userAlive, setUserAlive] = useState<boolean>(true);

  const onceDone = useRef<boolean>(false);

  const handleClick = () => {
    socket.emit('update_counter_click_the_bomb', room!.id);
  };

  const handleSkip = () => {
    socket.emit('change_turn', room!.id);
  };

  useEffect(() => {
    if (onceDone.current) return;

    if (!client!.isHost) return;

    socket.emit('start_game_click_the_bomb', room!.id);

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('update_bomb', (data: ClickTheBombType) => {
      setBomb(() => data);
    });

    socket.on('update_turn', (data: userType) => {
      setUserTurn(() => data);
    });

    socket.on('update_user_alive_status', () => {
      setUserAlive(() => false);
    });

    return () => {
      socket.off('update_bomb');
      socket.off('update_turn');
      socket.off('update_user_alive_status');
    };
  }, [socket]);

  return (
    <>
      {userAlive ? (
        <div>
          <h1>ClickTheBomb</h1>
          <p>Turn: {userTurn?.nickname!}</p>
          <button onClick={handleClick}>Click me</button>
          <button onClick={handleSkip}>Skip</button>
          <div>
            <p>Counter: {bomb?.counter}</p>
            <p>Max: {bomb?.max}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>You are dead</h1>
        </div>
      )}
    </>
  );
};
