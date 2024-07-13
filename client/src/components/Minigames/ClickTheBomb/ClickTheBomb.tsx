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
      console.log('Bomb updated', data);
      setBomb(() => data);
    });

    socket.on('update_turn', (data: number) => {
      console.log(users);

      const userTurn = users?.filter(
        (user) => user.position_in_room === data
      )[0];

      console.log('Turn updated', userTurn?.nickname);
    });

    return () => {
      socket.off('update_bomb');
      socket.off('update_turn');
    };
  }, [socket]);

  return (
    <div>
      <h1>ClickTheBomb</h1>
      <button onClick={handleClick}>Click me</button>
      <button onClick={handleSkip}>Skip</button>
      <div>
        <p>Counter: {bomb?.counter}</p>
        <p>Max: {bomb?.max}</p>
      </div>
    </div>
  );
};
