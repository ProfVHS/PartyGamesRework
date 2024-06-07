import React from "react";
import "./ButtonStyle.scss";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
};

export const Button = ({ children, onClick, style, type }: ButtonProps) => {
  return (
    <button className="button" type={type} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
