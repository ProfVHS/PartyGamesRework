import React from 'react';
import './ButtonStyle.scss';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'square' | 'round';
  color?: 'primary' | 'remove';
};

export const Button = ({
  children,
  onClick,
  style,
  type,
  variant,
  color,
}: ButtonProps) => {
  return (
    <button
      className={`button button${
        variant ? '__' + variant : '__square'
      } ${color}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
