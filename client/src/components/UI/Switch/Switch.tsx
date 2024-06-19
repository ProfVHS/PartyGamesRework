import './SwitchStyle.scss';

type SwitchProps = {
  defaultIsChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
};

export const Switch = ({ defaultIsChecked, onChange }: SwitchProps) => {
  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        defaultChecked={defaultIsChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      <span className="switch__track"></span>
      <span className="switch__thumb"></span>
    </label>
  );
};
