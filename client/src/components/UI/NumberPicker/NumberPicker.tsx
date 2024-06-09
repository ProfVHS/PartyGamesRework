import React, { useState } from 'react';
import './NumberPickerStyle.scss';

type NumberPickerProps = {
  min?: number;
  max?: number;
  onchange?: (number: number) => void;
};

export const NumberPicker = ({ min, max, onchange }: NumberPickerProps) => {
  const [number, setNumber] = useState(min || 1);
  const increment = () => {
    if (max && number >= max) return;
    setNumber((prevNumber) => prevNumber + 1);
    onchange && onchange(number + 1);
  };
  const decrement = () => {
    if (min && number <= min) return;
    setNumber((prevNumber) => prevNumber - 1);
    onchange && onchange(number + 1);
  };
  return (
    <div className="number-picker">
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
