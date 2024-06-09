import { NumberPicker } from '../../UI/NumberPicker/NumberPicker';
import './LobbySettingsStyle.scss';

export const LobbySettings = () => {
  return (
    <div className="lobby-settings">
      <span className="lobby-settings__title">Room Settings</span>
      <span className="lobby-settings__text">Number of Rounds</span>
      <NumberPicker min={2} max={20} />
      <span className="lobby-settings__text">Max Players</span>
      <NumberPicker min={3} max={8} />
    </div>
  );
};
