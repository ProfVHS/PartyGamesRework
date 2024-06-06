import React from "react";

type RowLayoutProps = {
  children: React.ReactNode;
  gap?: number;
};

export const RowLayout = ({ children, gap }: RowLayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: `${gap ?? 8}px`,
      }}>
      {children}
    </div>
  );
};
