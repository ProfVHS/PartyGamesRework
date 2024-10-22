interface ButtonProps {
  color: string;
  isLight: boolean;
  onClick: (color: string) => void;
}

export const Button = ({ color, isLight, onClick }: ButtonProps) => {
  return (
    <div
      className={`colorsmemory__button ${color} ${isLight ? 'light' : ''}`}
      onClick={() => {
        onClick(color);
      }}
    ></div>
  );
};
