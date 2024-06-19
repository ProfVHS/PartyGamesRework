import { useState } from 'react';
import './BooleanStyle.scss';

type BooleanPickerProps = {
  defaultBoolean?: boolean;
  onchange?: (boolean: boolean) => void;
};

export const BooleanPicker = ({
  defaultBoolean,
  onchange,
}: BooleanPickerProps) => {
  const [boolean, setBoolean] = useState(defaultBoolean || false);
  const toggle = () => {
    setBoolean((prevBoolean) => !prevBoolean);
    onchange && onchange(!boolean);
  };
  return (
    <div
      className={`boolean-picker ${boolean ? 'enable' : 'disable'}`}
      onClick={toggle}
    >
      {boolean ? 'Enable' : 'Disable'}
    </div>
  );
};
