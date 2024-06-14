import React from 'react';
import './ButtonStyle.scss';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'square' | 'round';
};

export const Button = ({
  children,
  onClick,
  style,
  type,
  variant,
}: ButtonProps) => {
  return (
    <button
      className={`button${variant ? '__' + variant : '__square'}`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
