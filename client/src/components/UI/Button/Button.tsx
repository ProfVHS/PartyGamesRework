import React from 'react';
import './ButtonStyle.scss';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'square' | 'round';
  color?: 'primary' | 'remove';
  size?: 'small' | 'medium' | 'large';
};

export const Button = ({
  children,
  onClick,
  style,
  type,
  variant,
  color,
  size,
}: ButtonProps) => {
  return (
    <button
      className={`button button${
        variant ? '--' + variant : '--square'
      } button--${color ?? 'primary'}Color button--${size ?? 'medium'}Size`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
