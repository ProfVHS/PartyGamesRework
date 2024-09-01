import { CardsType } from '../../../../Types/cardsType';
import { db } from '../../../../Database/database';

export const generateCardsArray = async (roomCode: string, round: number) => {
  const cardsScoreArray: [number[], number[], number[]] = [
    [25, 25, 25, 40, 40, 70, -20, -20, -35],
    [40, 40, 60, 80, 80, -35, -50, -50, -70],
    [60, 60, 80, 80, 100, -50, -70, -70, -90],
  ];
  const cardsArray: CardsType[] = [];

  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(
      Math.random() * cardsScoreArray[round].length
    );

    const card = {
      id: i,
      score: cardsScoreArray[round][randomIndex],
      isPossitive: cardsScoreArray[round][randomIndex] > 0,
      selectedByUsers: [],
    };

    cardsScoreArray[round].splice(randomIndex, 1);

    cardsArray.push(card);

    await new Promise<void>((resolve, reject) => {
      db.run(
        `INSERT INTO cards (card_id, score, isPossitive, room_id) VALUES (?, ?, ?, ?)`,
        [card.id, card.score, card.isPossitive, roomCode],
        (err: Error) => {
          if (err) {
            console.log('generateCardsArray.ts: Insert into cards');
            console.log(err.message);
            reject(err);
          }
          resolve();
        }
      );
    });
  }

  return cardsArray;
};
