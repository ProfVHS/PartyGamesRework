import './LobbyStyle.scss';
import { Button } from '../../UI/Button/Button';
import { RowLayout } from '../../layouts/RowLayout';
import { useState } from 'react';
import { LobbySettings } from '../lobbysettings/LobbySettings';
import { SettingsButton } from '../../UI/SettingsButton/SettingsButton';

import { roomDataContext } from '../../../useContext/roomDataContext';
import { clientDataContext } from '../../../useContext/clientDataContext';
import { useContext } from 'react';
import { socket } from '../../../socket';
import { LobbySettingsType } from '../../../types/LobbySettings.ts';
import { roomType } from '../../../types/roomType.ts';

export const Lobby = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [lobbySettings, setLobbySettings] = useState<LobbySettingsType>({
    isRandomMinigames: true,
    isTutorialsEnabled: true,
    minigames: []
  });

  const client = useContext(clientDataContext);

  const toggleLobbySettings = () => setIsSettingsOpen((prev) => !prev);
  return (
    <>
      <div className="lobby">
        {isSettingsOpen ? (
          <LobbySettings
            onCancel={() => setIsSettingsOpen(false)}
            lobbySettings={lobbySettings}
            setLobbySettings={setLobbySettings}
          />
        ) : (
          <div className="lobby__content">
            <LobbyContent />
            {client?.isHost == true && (
              <SettingsButton
                className="lobby__settingsbutton"
                onClick={() => toggleLobbySettings()}
              />
            )}
          </div>
        )}
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
