import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../socket';
import { minigamesArrayContext } from '../../useContext/minigamesArrayContext';
import { clientDataContext } from '../../useContext/clientDataContext';
import { roomDataContext } from '../../useContext/roomDataContext';
import './Minigame.scss';
import { ClickTheBomb } from '../Minigames/ClickTheBomb/ClickTheBomb';

export const Minigame = () => {
  const client = useContext(clientDataContext);
  const room = useContext(roomDataContext);
  const [minigamesArray, setMinigameArray] = useState<Minigame[] | undefined>(
    useContext(minigamesArrayContext)
  );
  const [currentMinigame, setCurrentMinigame] = useState<Minigame>({
    id: 0,
    minigameID: '',
    name: '',
  });

  const onceDone = useRef<boolean>(false);

  useEffect(() => {
    if (onceDone.current) return;
    if (!client!.isHost) return;

    socket.emit('update_currentMinigame', room!.id, minigamesArray![0]);

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('receive_minigamesArray', (data: Minigame[]) => {
      if (minigamesArray!.length > 0) return;
      console.log('Minigames updated', data);
      setMinigameArray(() => data);
    });

    socket.on('update_currentMinigame', (data: Minigame) => {
      console.log('Current Minigame updated', data);
      setCurrentMinigame(() => data);
    });

    socket.on('receive_currentMinigame', (data: Minigame) => {
      console.log('Current Minigame updated', data);
      setCurrentMinigame(() => data);
    });

    return () => {
      socket.off('receive_minigamesArray');
      socket.off('update_currentMinigame');
    };
  }, [socket]);

  useEffect(() => {
    console.log(minigamesArray);
  }, [minigamesArray]);

  return (
    <div>
      {currentMinigame!.minigameID === 'CTB' && <ClickTheBomb />}
      {currentMinigame!.minigameID === 'CARDS' && <div>Cards</div>}
    </div>
  );
};
