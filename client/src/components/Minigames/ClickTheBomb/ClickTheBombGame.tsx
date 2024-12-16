import { useContext, useEffect, useState, useRef } from 'react';
import { socket } from '../../../socket';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { clientDataContext } from '../../../useContext/clientDataContext';
import { ClickTheBomb } from '../../features/clickthebomb/ClickTheBomb';
import { ClickTheBombType } from '../../../types/clickthebombType.ts';
import { userType } from '../../../types/userType.ts';

export const ClickTheBombGame = () => {
  const room = useContext(roomDataContext);
  const client = useContext(clientDataContext);
  const [bomb, setBomb] = useState<ClickTheBombType | undefined>(undefined);
  const [userTurn, setUserTurn] = useState<userType | undefined>(undefined);

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
  }, [client, room]);

  useEffect(() => {
    socket.on('update_bomb', (data: ClickTheBombType) => {
      setBomb(() => data);
    });

    socket.on('update_turn', (data: userType) => {
      setUserTurn(() => data);
    });

    return () => {
      socket.off('update_bomb');
      socket.off('update_turn');
    };
  }, []);

  return (
    <ClickTheBomb
      handleClick={handleClick}
      handleSkip={handleSkip}
      userTurn={userTurn}
      counter={bomb?.counter || 0}
    />
  );
};
