import { useContext, useEffect, useRef, useState } from 'react';
import { socket } from '../../../socket';

import './style.scss';

import { clientDataContext } from '../../../useContext/clientDataContext';
import { roomDataContext } from '../../../useContext/roomDataContext';
import { usersDataContext } from '../../../useContext/usersDataContext';

import { Card } from '../../features/cards/Card';

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
    if (stopwatch < 1) return;

    socket.emit('update_selected_card', socket.id, id);

    setCardsArray((prevCardsArray) => {
      return prevCardsArray.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            isSelected: true,
          };
        }

        return { ...card, isSelected: false };
      });
    });
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
      const updatedRows = data.map((row) => ({
        ...row,
        selectedByUsers: [],
        flip: false,
      }));

      if (data.length < 9) {
        setTimeout(() => {
          socket.emit('get_cards', room!.id);
        }, 400);
      } else {
        if (onceDoneInterval.current) return;

        onceDoneInterval.current = true;

        setCardsArray(() => updatedRows);

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
    const usersPlaying = users?.filter(
      (user) => user.alive && !user.isDisconnected,
    );

    if (usersReady?.length !== usersPlaying?.length) return;
    if (cardsArray.length < 9) return;

    gameStatus.current = true;

    let flipIndex = -1;

    const interval = setInterval(() => {
      flipIndex++;

      const usersSelectedCardId = users?.filter(
        (user) => user.selected_id === flipIndex && user.alive,
      );

      setCardsArray((prevCards) =>
        prevCards.map((card, index) => {
          if (index != flipIndex) return card;

          if (usersSelectedCardId!.length > 0) {
            if (client?.isHost) {
              socket.emit(
                'update_user_score_cards',
                usersSelectedCardId,
                cardsArray[flipIndex],
              );
            }
          }

          return {
            ...card,
            flip: true,
            isSelected: false,
            selectedByUsers: usersSelectedCardId,
          };
        }),
      );

      if (flipIndex >= cardsArray.length) {
        clearInterval(interval);

        onceDoneInterval.current = false;
        gameStatus.current = false;

        setStopwatch(10);

        setTimeout(() => {
          setCardsArray((prevCards) =>
            prevCards.map((card) => {
              return {
                ...card,
                flip: false,
                isSelected: false,
                selectedByUsers: [],
              };
            }),
          );
        }, 2000);

        setTimeout(() => {
          startGame();
        }, 3000);
        return;
      }
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
          <div className="cards__wrapper">
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
