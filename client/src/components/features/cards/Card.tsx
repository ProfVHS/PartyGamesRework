import './Card.scss';
import logo from '../../../assets/textures/logo.svg';

import { CardFrontNegative } from './CardFrontNegative';
import { CardFrontPositive } from './CardFrontPositive';
import { useEffect, useState } from 'react';

type CardType = CardsType & {
  flip: boolean;
  isSelected?: boolean;
};

export const Card = ({
  score,
  isPossitive,
  selectedByUsers,
  flip,
  isSelected,
}: CardType) => {
  const cardSign = isPossitive ? 'possitive' : 'negative';
  const cardStatus = isSelected ? 'selected' : '';

  const [cardFlip, setCardFlip] = useState<boolean>(false);
  const [cardSite, setCardSite] = useState<'front' | 'back'>('back');

  useEffect(() => {
    setCardFlip(true);

    setTimeout(() => {
      setCardFlip(false);
      if (flip) {
        setCardSite('front');
      } else {
        setCardSite('back');
      }
    }, 250);
  }, [flip]);

  return (
    <>
      <div
        className={`card ${cardSite} ${cardSign} ${cardStatus} ${cardFlip ? 'flip' : ''}`}
      >
        {cardSite == 'front' ? (
          isPossitive ? (
            <CardFrontPositive score={score} usersSelected={selectedByUsers!} />
          ) : (
            <CardFrontNegative score={score} usersSelected={selectedByUsers!} />
          )
        ) : (
          <>
            <img src={logo} alt="logo" className="card__icon" />
          </>
        )}
      </div>
    </>
  );
};
