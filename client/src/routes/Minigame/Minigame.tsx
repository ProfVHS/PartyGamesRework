import { useContext, useEffect, useState } from 'react';
import { socket } from '../../socket';
import { minigamesArrayContext } from '../../useContext/minigamesArrayContext';
import './Minigame.scss';

export const Minigames = () => {
  const [minigamesArray, setMinigameArray] = useState<Minigame[] | undefined>(
    useContext(minigamesArrayContext)
  );

  useEffect(() => {
    socket.on('update_miniGamesArray', (data: Minigame[]) => {
      console.log('Minigames updated', data);
      setMinigameArray(() => data);
    });

    return () => {
      socket.off('update_miniGamesArray');
    };
  }, [socket]);

  return (
    <div>
      <h1>Minigames</h1>
    </div>
  );
};
