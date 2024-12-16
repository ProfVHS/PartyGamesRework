import { userType } from '../../../types/userType.ts';

interface CardFrontPositiveProps {
  score: number;
  usersSelected: userType[];
}

export const CardFrontPositive = ({
  score,
  usersSelected,
}: CardFrontPositiveProps) => {
  return (
    <div className="card__front">
      <span className="card__front__corner left">+{score}</span>
      <span className="card__front__mid">+{score}</span>
      <span className="card__front__corner right">+{score}</span>
      <span className="card__front__users ">
        {usersSelected.map((user) => (
          <span
            key={user.id}
            className="card__front__users__icon icon__possitive"
          >
            {user.nickname.substring(0, 1)}
          </span>
        ))}
      </span>
    </div>
  );
};
