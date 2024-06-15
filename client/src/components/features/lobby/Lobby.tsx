import './LobbyStyle.scss';
import { Button } from '../../UI/Button/Button';
import { RowLayout } from '../../layouts/RowLayout';
import { useState } from 'react';
import { LobbySettings } from '../lobbysettings/LobbySettings';
import { SettingsButton } from '../../UI/SettingsButton/SettingsButton';

import { AnimatePresence, motion } from 'framer-motion';
import { Modal } from '../../UI/Modal/Modal';
import { MinigamesList } from '../minigamesList/MinigamesList';

export const Lobby = () => {
  const [lobbySettings, setLobbySettings] = useState(false);
  const toggleLobbySettings = () => setLobbySettings((prev) => !prev);
  return (
    <>
      <div className="lobby">
        <AnimatePresence mode="wait" initial={false}>
          {lobbySettings ? (
            <motion.div
              key={'1'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.2, duration: 0.2 }}
              style={{ height: '100%' }}
            >
              <LobbySettings onCancel={() => setLobbySettings(false)} />
            </motion.div>
          ) : (
            <motion.div
              className="lobby__content"
              key={'2'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <LobbyContent />
              <SettingsButton
                className="lobby__settingsbutton"
                onClick={() => toggleLobbySettings()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const LobbyContent = () => {
  const [ready, setReady] = useState(false);
  const [playersReady, setPlayersReady] = useState(0);
  const toggleReady = () => {
    setReady((prevReady) => !prevReady);
    setPlayersReady((prevPlayersReady) =>
      ready ? prevPlayersReady - 1 : prevPlayersReady + 1
    );
  };
  return (
    <>
      <span className="lobby__title">Room Code: 12345</span>
      <RowLayout>
        <span className="lobby__players">{playersReady}</span>
        <span className="lobby__text">Players ready</span>
      </RowLayout>
      <Button style={{ width: '75%' }} onClick={toggleReady}>
        {ready ? 'Unready' : 'Ready'}
      </Button>
    </>
  );
};
