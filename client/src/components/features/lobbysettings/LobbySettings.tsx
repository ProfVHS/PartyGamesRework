import { useState } from 'react';
import { RowLayout } from '../../layouts/RowLayout';
import { BooleanPicker } from '../../UI/BooleanPicker/BooleanPicker';
import { Button } from '../../UI/Button/Button';
import { NumberPicker } from '../../UI/NumberPicker/NumberPicker';
import './LobbySettingsStyle.scss';
import { Modal } from '../../UI/Modal/Modal';
import { MinigamesList } from '../minigamesList/MinigamesList';
import { AnimatePresence } from 'framer-motion';
import { Minigame } from '../../../types/Minigame';
import { Switch } from '../../UI/Switch/Switch';
import { LobbySettingsType } from '../../../types/LobbySettings';

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

  const [newSettings, setNewSettings] =
    useState<LobbySettingsType>(lobbySettings);

  const handleSave = () => {
    console.log('Save');
    console.log('Number of Minigames:', newSettings?.numberOfMinigames);
    console.log('Tutorials:', newSettings?.isTutorialsEnabled);
    console.log('Minigames:', newSettings?.minigames);

    setLobbySettings(newSettings);
    onCancel();
  };
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
            max={25}
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
            setNewSettings({ ...lobbySettings, isTutorialsEnabled: value })
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
              minigames={lobbySettings.minigames || []}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
