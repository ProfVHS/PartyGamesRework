import React from 'react';

type RowLayoutProps = {
  children: React.ReactNode;
  gap?: number;
  ref?: React.RefObject<HTMLDivElement>;
};

export const RowLayout = ({ children, gap, ref }: RowLayoutProps) => {
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: `${gap ?? 8}px`,
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};
