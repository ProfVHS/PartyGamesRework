import './LobbyStyle.scss';
import { Button } from '../../UI/Button/Button';
import { RowLayout } from '../../layouts/RowLayout';
import { useState } from 'react';
import { LobbySettings } from '../lobbysettings/LobbySettings';
import { SettingsButton } from '../../UI/SettingsButton/SettingsButton';

import { AnimatePresence, motion } from 'framer-motion';

import { roomDataContext } from '../../../useContext/roomDataContext';
import { usersDataContext } from '../../../useContext/usersDataContext';
import { useContext } from 'react';
import { socket } from '../../../socket';

export const Lobby = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [lobbySettings, setLobbySettings] = useState<LobbySettingsType>({
    isRandomMinigames: true,
    isTutorialsEnabled: true,
    minigames: [],
  });

  const users = useContext(usersDataContext);
  const isHost = users?.find((user) => user.isHost)?.id === socket.id;

  const toggleLobbySettings = () => setIsSettingsOpen((prev) => !prev);
  return (
    <>
      <div className="lobby">
        <AnimatePresence mode="wait" initial={false}>
          {isSettingsOpen ? (
            <motion.div
              key={'1'}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
              transition={{ delay: 0.2, duration: 0.2 }}
              style={{ height: '100%' }}
            >
              <LobbySettings
                onCancel={() => setIsSettingsOpen(false)}
                lobbySettings={lobbySettings}
                setLobbySettings={setLobbySettings}
              />
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
              {isHost && (
                <SettingsButton
                  className="lobby__settingsbutton"
                  onClick={() => toggleLobbySettings()}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const LobbyContent = () => {
  const roomData: roomType | null = useContext(roomDataContext)!;
  const [ready, setReady] = useState(false);

  if (!roomData) {
    return <></>;
  }

  const toggleReady = () => {
    setReady((prevReady) => !prevReady);

    const readyValue = ready ? -1 : 1;

    socket.emit('toggle_ready', roomData, readyValue);
  };

  const CopyRoomCode = () => {
    navigator.clipboard.writeText(roomData.id);
  };

  return (
    <>
      <span className="lobby__title" onClick={CopyRoomCode}>
        Room Code: {roomData.id}
      </span>
      <RowLayout justifyContent="center">
        <span className="lobby__players">{roomData.players_ready}</span>
        <span className="lobby__text">Players ready</span>
      </RowLayout>
      <Button style={{ width: '75%' }} onClick={toggleReady}>
        {ready ? 'Unready' : 'Ready'}
      </Button>
    </>
  );
};
