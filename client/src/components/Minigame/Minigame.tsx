import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { minigamesArrayContext } from '../../useContext/minigamesArrayContext';
import { clientDataContext } from '../../useContext/clientDataContext';
import { roomDataContext } from '../../useContext/roomDataContext';
import './Minigame.scss';
import { ClickTheBombGame } from '../Minigames/ClickTheBomb/ClickTheBombGame';
import { CardsGame } from '../Minigames/Cards/CardsGame';

export const Minigame = () => {
  const client = useContext(clientDataContext);
  const room = useContext(roomDataContext);
  const minigamesArray = useContext(minigamesArrayContext);
  const [currentMinigame, setCurrentMinigame] = useState<Minigame>({
    id: 0,
    minigameID: '',
    name: '',
  });

  const onceDone = useRef<boolean>(false);

  useEffect(() => {
    if (onceDone.current) return;

    localStorage.setItem('socket-id', socket.id!);

    if (!client!.isHost) return;

    socket.emit('update_currentMinigame', room!.id, minigamesArray![0]);
    socket.emit('update_in_game_status', room!.id, true);

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('update_currentMinigame', (data: Minigame) => {
      console.log('Current Minigame updated', data);
      setCurrentMinigame(() => data);
    });

    socket.on('receive_currentMinigame', (data: Minigame) => {
      console.log('Current Minigame updated', data);
      setCurrentMinigame(() => data);
    });

    return () => {
      socket.off('update_currentMinigame');
      socket.off('receive_currentMinigame');
    };
  }, [socket]);

  return (
    <div>
      {currentMinigame!.minigameID === 'CTB' && <CardsGame />}
      {currentMinigame!.minigameID === 'CARDS' && <CardsGame />}
    </div>
  );
};
