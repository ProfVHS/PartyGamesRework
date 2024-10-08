import { useContext, useEffect, useRef, useState } from 'react';

import './Minigame.scss';

import { socket } from '../../socket';

import { minigamesArrayContext } from '../../useContext/minigamesArrayContext';
import { clientDataContext } from '../../useContext/clientDataContext';
import { roomDataContext } from '../../useContext/roomDataContext';

import Leaderboard from '../leaderboards/Leaderboard';
import { ClickTheBombGame } from '../Minigames/ClickTheBomb/ClickTheBombGame';
import { CardsGame } from '../Minigames/Cards/CardsGame';
import ColorsMemory from '../Minigames/ColorsMemory/ColorsMemory';

export const Minigame = () => {
  const client = useContext(clientDataContext);
  const room = useContext(roomDataContext);
  const minigamesArray = useContext(minigamesArrayContext);
  const [currentMinigame, setCurrentMinigame] = useState<Minigame>({
    id: 0,
    minigame_id: '',
    name: '',
  });

  const onceDone = useRef<boolean>(false);

  useEffect(() => {
    if (currentMinigame.minigame_id == '' && room!.in_game) {
      socket.emit('get_minigame', room!.id);
    }
  }, []);

  useEffect(() => {
    if (onceDone.current) return;

    localStorage.setItem('socket-id', socket.id!);

    if (!client!.isHost) return;

    socket.emit('update_currentMinigame', room!.id, minigamesArray![0]);
    socket.emit('update_in_game_status', room!.id, true);

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('receive_currentMinigame', (data: Minigame) => {
      console.log('Minigame - ', data.name);
      setCurrentMinigame(() => data);
    });

    socket.on('start_new_game', () => {
      setCurrentMinigame({ ...currentMinigame, minigame_id: 'Leaderboard' });
      setTimeout(() => {
        if (!client!.isHost) return;
        const newIndex = currentMinigame.id;

        const game = minigamesArray![newIndex! + 1];

        socket.emit('update_currentMinigame', room!.id, game);
      }, 4000);
    });

    return () => {
      socket.off('receive_currentMinigame');
      socket.off('start_new_game');
    };
  }, [socket]);

  return (
    <div>
      {currentMinigame!.minigame_id === 'Leaderboard' && <Leaderboard />}
      {currentMinigame!.minigame_id === 'CTB' && <ColorsMemory />}
      {currentMinigame!.minigame_id === 'CARDS' && <ColorsMemory />}
      {currentMinigame!.minigame_id === 'COLORS' && <ColorsMemory />}
    </div>
  );
};
