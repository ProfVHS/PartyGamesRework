import MineSvg from './MineSvg';

interface CardFrontNegativeProps {
  score: number;
  usersSelected: userType[];
}

export const CardFrontNegative = ({
  score,
  usersSelected,
}: CardFrontNegativeProps) => {
  return (
    <div className="card__front">
      <span className="card__front__corner left">{score}</span>
      <MineSvg className="card__icon" />
      <span className="card__front__corner right">{score}</span>
      <span className="card__front__users ">
        {usersSelected.map((user) => (
          <span
            key={user.id}
            className="card__front__users__icon icon__negative"
          >
            {user.nickname.substring(0, 1)}
          </span>
        ))}
      </span>
    </div>
  );
};
