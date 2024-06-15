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

type LobbySettingsProps = {
  onCancel: () => void;
};

export const LobbySettings = ({ onCancel }: LobbySettingsProps) => {
  const [numberOfMinigames, setNumberOfMinigames] = useState(5);
  const [isTutorialsEnabled, setIsTutorialEnabled] = useState(true);
  const [minigames, setMinigames] = useState<Minigame[]>([]);

  const [isRandomMinigames, setIsRandomMinigames] = useState(true);
  const [minigamesModal, setMinigamesModal] = useState(false);

  const handleSave = () => {
    console.log('Save');
    console.log('Number of Minigames:', numberOfMinigames);
    console.log('Tutorials:', isTutorialsEnabled);
    console.log('Minigames:', minigames);
  };
  return (
    <div className="lobby-settings">
      <span className="lobby-settings__title">Room Settings</span>

      <RowLayout justifyContent="space-between">
        <span>Random Minigames?</span>
        <Switch
          defaultIsChecked={isRandomMinigames}
          onChange={setIsRandomMinigames}
        />
      </RowLayout>

      <div className="lobby-settings__separator"></div>

      {isRandomMinigames ? (
        <RowLayout justifyContent="space-between">
          <span>Number of Minigames</span>
          <NumberPicker
            defaultNumber={numberOfMinigames}
            min={2}
            max={25}
            onchange={(value) => setNumberOfMinigames(value)}
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
          defaultIsChecked={isTutorialsEnabled}
          onChange={setIsTutorialEnabled}
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
              onSave={setMinigames}
              minigames={minigames}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
