import { useEffect, useState } from 'react';
import { RowLayout } from '../../layouts/RowLayout';
import { Button } from '../../UI/Button/Button';
import { NumberPicker } from '../../UI/NumberPicker/NumberPicker';
import './LobbySettingsStyle.scss';
import { Modal } from '../../UI/Modal/Modal';
import { MinigamesList } from '../minigamesList/MinigamesList';
import { AnimatePresence } from 'framer-motion';
import { Switch } from '../../UI/Switch/Switch';
import { Alert } from '../../UI/Alert/Alert';
import { socket } from '../../../socket';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { useContext } from 'react';

type LobbySettingsProps = {
  onCancel: () => void;
  lobbySettings: LobbySettingsType;
  setLobbySettings: (settings: LobbySettingsType) => void;
};

export const LobbySettings = ({
  onCancel,
  lobbySettings,
  setLobbySettings,
}: LobbySettingsProps) => {
  const [minigamesModal, setMinigamesModal] = useState(false);
  const [showAlert, setShowAlert] = useState<AlertType | null>(null);
  const roomData = useContext(roomDataContext);

  const [newSettings, setNewSettings] =
    useState<LobbySettingsType>(lobbySettings);

  const handleSave = () => {
    if (!newSettings.isRandomMinigames) {
      if (newSettings.minigames === null || newSettings.minigames!.length < 2) {
        setShowAlert({
          message: 'Please select at least two minigame',
          type: 'error',
          duration: 5,
        });
        return;
      }
    }

    socket.emit(
      'create_miniGamesArray',
      roomData!.id,
      newSettings.minigames,
      newSettings.numberOfMinigames || 2,
    );
    setShowAlert(null);
    setLobbySettings(newSettings);
    onCancel();
  };

  useEffect(() => {
    console.log(newSettings);
  }, [newSettings]);

  return (
    <div className="lobby-settings">
      <span className="lobby-settings__title">Room Settings</span>

      <RowLayout justifyContent="space-between">
        <span>Random Minigames?</span>
        <Switch
          defaultIsChecked={newSettings.isRandomMinigames}
          onChange={(value) =>
            setNewSettings({ ...newSettings, isRandomMinigames: value })
          }
        />
      </RowLayout>

      <div className="lobby-settings__separator"></div>

      {newSettings.isRandomMinigames ? (
        <RowLayout justifyContent="space-between">
          <span>Number of Minigames</span>
          <NumberPicker
            defaultNumber={lobbySettings.numberOfMinigames || 2}
            min={2}
            max={3}
            onchange={(value) =>
              setNewSettings({ ...newSettings, numberOfMinigames: value })
            }
          />
        </RowLayout>
      ) : (
        <RowLayout justifyContent="space-between">
          <span>Minigames</span>
          <Button
            color="primary"
            size="small"
            onClick={() => setMinigamesModal(true)}
          >
            Open List
          </Button>
        </RowLayout>
      )}

      <div className="lobby-settings__separator"></div>

      <RowLayout justifyContent="space-between">
        <span>Tutorials before minigame?</span>
        <Switch
          defaultIsChecked={lobbySettings.isTutorialsEnabled}
          onChange={(value) =>
            setNewSettings({ ...newSettings, isTutorialsEnabled: value })
          }
        />
      </RowLayout>

      <div className="lobby-settings__separator"></div>

      <RowLayout justifyContent="space-between">
        <Button style={{ width: '100%' }} onClick={handleSave}>
          Save
        </Button>
        <Button style={{ width: '100%' }} onClick={onCancel}>
          Cancel
        </Button>
      </RowLayout>
      <AnimatePresence>
        {minigamesModal && (
          <Modal onClose={() => setMinigamesModal(false)}>
            <MinigamesList
              onCancel={() => setMinigamesModal(false)}
              onSave={(minigames: Minigame[]) =>
                setNewSettings({ ...newSettings, minigames })
              }
              minigames={newSettings.minigames || []}
            />
          </Modal>
        )}
      </AnimatePresence>
      {showAlert && <Alert {...showAlert} onClose={() => setShowAlert(null)} />}
    </div>
  );
};
