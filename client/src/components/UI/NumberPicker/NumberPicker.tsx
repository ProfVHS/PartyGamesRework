import React, { useState } from 'react';
import './NumberPickerStyle.scss';

type NumberPickerProps = {
  min?: number;
  max?: number;
  defaultNumber?: number;
  onchange?: (number: number) => void;
  style?: React.CSSProperties;
};

export const NumberPicker = ({
  min,
  max,
  defaultNumber,
  onchange,
  style,
}: NumberPickerProps) => {
  const [number, setNumber] = useState(defaultNumber || min || 0);
  const increment = () => {
    if (number >= max!) return;
    setNumber((prevNumber) => prevNumber + 1);
    onchange && onchange(number + 1);
  };
  const decrement = () => {
    if (number <= min!) return;
    setNumber((prevNumber) => prevNumber - 1);
    onchange && onchange(number - 1);
  };
  return (
    <div className="number-picker number-picker--smallSize" style={style}>
      <span className="number-picker__button" onClick={decrement}>
        -
      </span>
      <span className="number-picker__number">{number}</span>
      <span className="number-picker__button" onClick={increment}>
        +
      </span>
    </div>
  );
};
