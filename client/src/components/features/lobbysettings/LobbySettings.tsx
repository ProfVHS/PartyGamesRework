import { useState } from 'react';
import { RowLayout } from '../../layouts/RowLayout';
import { BooleanPicker } from '../../UI/BooleanPicker/BooleanPicker';
import { Button } from '../../UI/Button/Button';
import { NumberPicker } from '../../UI/NumberPicker/NumberPicker';
import './LobbySettingsStyle.scss';

type LobbySettingsProps = {
  onCancel: () => void;
};

export const LobbySettings = ({ onCancel }: LobbySettingsProps) => {
  const [numberOfMinigames, setNumberOfMinigames] = useState(5);
  const [tutorials, setTutorials] = useState(true);

  const handleSave = () => {
    console.log('Save');
    console.log('Number of Minigames:', numberOfMinigames);
    console.log('Tutorials:', tutorials);
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
      <span className="lobby-settings__text">Max Players</span>
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
    </div>
  );
};
