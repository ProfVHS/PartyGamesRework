import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket';
import { clientDataContext } from '../../../useContext/clientDataContext';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { Card } from '../../features/cards/Card';

export const CardsGame = () => {
  const client = useContext(clientDataContext);
  const room = useContext(roomDataContext);

  const [cardsArray, setCardsArray] = useState<CardsType[]>([]);

  const onceDone = useRef<boolean>(false);

  useEffect(() => {
    if (onceDone.current) return;

    if (!client!.isHost) return;

    socket.emit('start_game_cards', room!.id);

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('update_cards', (data: CardsType[]) => {
      setCardsArray(() => data);
    });

    return () => {
      socket.off('update_cards');
    };
  }, [socket]);

  return (
    <>
      <div>CardsGame</div>
      {cardsArray.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </>
  );
};
