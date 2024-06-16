import React from 'react';

type RowLayoutProps = {
  children: React.ReactNode;
  gap?: number;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';

  className?: string;
};

export const RowLayout = ({
  children,
  gap,
  justifyContent,
  className,
}: RowLayoutProps) => {
  return (
    <div
      className={className ?? ''}
      style={{
        display: 'flex',
        justifyContent: justifyContent ?? 'flex-start',
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
