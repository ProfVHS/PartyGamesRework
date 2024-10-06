import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket';
import { clientDataContext } from '../../../useContext/clientDataContext';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { Card } from '../../features/cards/Card';
import { usersDataContext } from '../../../useContext/usersDataContext';

export const CardsGame = () => {
  const client = useContext(clientDataContext);
  const users = useContext(usersDataContext);
  const room = useContext(roomDataContext);

  const [cardsArray, setCardsArray] = useState<CardsType[]>([]);
  const [stopwatch, setStopwatch] = useState<number>(10);

  const onceDone = useRef<boolean>(false);
  const onceDoneInterval = useRef<boolean>(false);

  const gameStatus = useRef<boolean>(false);

  const startGame = () => {
    if (!client!.isHost) return;

    socket.emit('start_game_cards', room!.id);
  };

  const handleSelectCard = (id: number) => {
    socket.emit('update_selected_card', socket.id, id);
  };

  const StopWatch = async () => {
    await new Promise<void>((resolve) => {
      const stopwatchInterval = setInterval(() => {
        setStopwatch((prevStopwatch) => {
          if (prevStopwatch === 1) {
            clearInterval(stopwatchInterval);
            resolve();
          }

          return prevStopwatch - 1;
        });
      }, 1000);
    });
  };

  useEffect(() => {
    if (onceDone.current) return;

    startGame();

    onceDone.current = true;
  }, []);

  useEffect(() => {
    if (cardsArray.length > 0) return;

    if (client?.alive) {
      socket.emit('get_cards', room!.id);
    }
  }, []);

  useEffect(() => {
    socket.on('update_cards', (data: CardsType[]) => {
      console.log('Update cards', data);
      if (data.length < 9) {
        setTimeout(() => {
          socket.emit('get_cards', room!.id);
        }, 400);
      } else {
        if (onceDoneInterval.current) return;

        onceDoneInterval.current = true;

        setCardsArray(() => data);

        StopWatch().then(() => {
          socket.emit('check_are_users_ready', room!.id, users?.length);
        });
      }
    });

    return () => {
      socket.off('update_cards');
    };
  }, [socket]);

  useEffect(() => {
    if (gameStatus.current) return;

    const usersReady = users?.filter((user) => user.ready);
    const usersPlaying = users?.filter((user) => user.alive);

    if (usersReady?.length !== usersPlaying?.length) return;
    if (cardsArray.length < 9) return;

    gameStatus.current = true;

    let cardId = 0;

    const myInterval = setInterval(() => {
      const usersSelectedCardId = users?.filter(
        (user) => user.selected_id === cardId && user.alive
      );

      if (usersSelectedCardId!.length > 0) {
        if (client?.isHost) {
          socket.emit(
            'update_user_score_cards',
            usersSelectedCardId,
            cardsArray[cardId]
          );
        }
        setCardsArray((prevCardsarry) => {
          prevCardsarry[cardId - 1].selectedByUsers = usersSelectedCardId;

          const newCardsArray = prevCardsarry;

          return newCardsArray;
        });
      }

      if (cardId == 8) {
        clearInterval(myInterval);

        onceDoneInterval.current = false;
        gameStatus.current = false;

        setStopwatch(10);
        setCardsArray(() => []);

        startGame();
        return;
      }

      cardId++;
    }, 500);
  }, [users]);

  return (
    <>
      <div>CardsGame</div>
      {!client?.alive ? (
        <div>Wait for next round</div>
      ) : (
        <>
          {' '}
          <div>Round: {room!.round}</div>
          <div>{stopwatch}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {cardsArray.map((card) => (
              <div key={card.id} onClick={() => handleSelectCard(card.id)}>
                <Card {...card} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
