import './LobbyStyle.scss';
import { Button } from '../../UI/Button/Button';
import { RowLayout } from '../../layouts/RowLayout';
import { useState } from 'react';

export const Lobby = () => {
  const [ready, setReady] = useState(false);
  const [playersReady, setPlayersReady] = useState(0);
  const toggleReady = () => {
    setReady((prevReady) => !prevReady);
    setPlayersReady((prevPlayersReady) =>
      ready ? prevPlayersReady - 1 : prevPlayersReady + 1
    );
  };
  return (
    <div className="lobby">
      <span className="lobby__title">Room Code: 12345</span>
      <RowLayout>
        <span className="lobby__players">{playersReady}</span>
        <span className="lobby__text">Players ready</span>
      </RowLayout>
      <Button style={{ width: '75%' }} onClick={toggleReady}>
        {ready ? 'Unready' : 'Ready'}
      </Button>
    </div>
  );
};
