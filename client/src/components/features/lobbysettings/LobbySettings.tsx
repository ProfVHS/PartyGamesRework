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

type LobbySettingsProps = {
  onCancel: () => void;
};

export const LobbySettings = ({ onCancel }: LobbySettingsProps) => {
  const [numberOfMinigames, setNumberOfMinigames] = useState(5);
  const [tutorials, setTutorials] = useState(true);
  const [minigames, setMinigames] = useState<Minigame[]>([]);

  const [minigamesModal, setMinigamesModal] = useState(false);

  const handleSave = () => {
    console.log('Save');
    console.log('Number of Minigames:', numberOfMinigames);
    console.log('Tutorials:', tutorials);
    console.log('Minigames:', minigames);
  };
  return (
    <div className="lobby-settings">
      <span className="lobby-settings__title">Room Settings</span>
      <span className="lobby-settings__text">Number of Minigames</span>
      <NumberPicker
        min={2}
        max={20}
        defaultNumber={5}
        onchange={setNumberOfMinigames}
      />
      <span className="lobby-settings__text">Number of Minigames</span>
      <Button onClick={() => setMinigamesModal(true)}>Set Minigames</Button>
      <span className="lobby-settings__text">Tutorials?</span>
      <BooleanPicker defaultBoolean={true} onchange={setTutorials} />
      <RowLayout>
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
