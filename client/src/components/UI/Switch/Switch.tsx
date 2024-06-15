import './SwitchStyle.scss';

type SwitchProps = {
  defaultIsChecked?: boolean;
};

export const Switch = ({ defaultIsChecked }: SwitchProps) => {
  return (
    <label className="switch">
      <input
        className="switch__input"
        type="checkbox"
        defaultChecked={defaultIsChecked}
      />
      <span className="switch__track"></span>
      <span className="switch__thumb"></span>
    </label>
  );
};
