import './Card.scss';

export const Card = ({
  id,
  score,
  isPossitive,
  selectedByUsers,
}: CardsType) => {
  return (
    <>
      <div className="card">
        <div className="card__id">{id}</div>
        <div className="card__score">{score}</div>
        <div className="card__isPossitive">
          {isPossitive ? 'true' : 'false'}
        </div>
        {selectedByUsers?.map((user) => (
          <div key={user.id}>{user.nickname}</div>
        ))}
      </div>
    </>
  );
};
