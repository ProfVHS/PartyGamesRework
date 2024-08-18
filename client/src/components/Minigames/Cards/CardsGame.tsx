import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket';
import { clientDataContext } from '../../../useContext/clientDataContext';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { Card } from '../../features/cards/Card';
import { set } from 'react-hook-form';

export const CardsGame = () => {
  const client = useContext(clientDataContext);
  const room = useContext(roomDataContext);

  const [cardsArray, setCardsArray] = useState<CardsType[]>([]);
  const [stopwatch, setStopwatch] = useState<number>(3);

  const onceDone = useRef<boolean>(false);

  const StopWatch = () => {
    const stopwatchInterval = setInterval(() => {
      setStopwatch((prev) => {
        if (prev === 1) {
          if (client!.isHost) {
            socket.emit('check_are_users_ready', room!.id);
          }
          clearInterval(stopwatchInterval);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const CardsInterval = (users: userType[]) => {
    let cardId = 0;

    const cardsInterval = setInterval(() => {
      if (cardId == 8) {
        clearInterval(cardsInterval);
      }

      setCardsArray((prevCardsArray) => {
        const updatedCardsArray = prevCardsArray.map((card, index) => {
          if (index === cardId) {
            // Find users who selected this card
            const usersSelectedCardId = users.filter(
              (user) => user.selected_id === cardId
            );

            if (usersSelectedCardId.length > 0) {
              if (client!.isHost) {
                socket.emit(
                  'update_user_score_cards',
                  usersSelectedCardId,
                  card
                );
              }
              // Give points to users who selected this card
            }

            return {
              ...card,
              selectedByUsers: usersSelectedCardId,
            };
          }

          return card;
        });

        return updatedCardsArray;
      });

      if (cardId == 8) {
        clearInterval(cardsInterval);
      }

      cardId++;
    }, 500);
  };

  useEffect(() => {
    if (onceDone.current) return;

    if (!client!.isHost) return;

    socket.emit('start_game_cards', room!.id);

    onceDone.current = true;
  }, []);

  useEffect(() => {
    socket.on('update_cards', (data: CardsType[]) => {
      setCardsArray(() => data);
      StopWatch();
    });

    socket.on('all_users_ready_cards', (data: userType[]) => {
      CardsInterval(data);
    });

    return () => {
      socket.off('update_cards');
      socket.off('all_users_ready_cards');
    };
  }, [socket]);

  return (
    <>
      <div>CardsGame</div>
      <div>{stopwatch}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cardsArray.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </>
  );
};
