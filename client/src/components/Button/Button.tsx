import React from "react";
import "./ButtonStyle.scss";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Button = ({ children, onClick, style }: ButtonProps) => {
  return (
    <button className="button" style={style} onClick={onClick}>
      {children}
    </button>
  );
};
