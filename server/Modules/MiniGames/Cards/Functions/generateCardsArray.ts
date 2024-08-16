import { CardsType } from '../../../../Types/cardsType';

export const generateCardsArray = async (round: number) => {
  const roundGame = round - 1;

  const cardsScoreArray: [number[], number[], number[]] = [
    [25, 25, 25, 40, 40, 70, -20, -20, -35],
    [40, 40, 60, 80, 80, -35, -50, -50, -70],
    [60, 60, 80, 80, 100, -50, -70, -70, -90],
  ];
  const cardsArray: CardsType[] = [];

  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(
      Math.random() * cardsScoreArray[roundGame].length
    );

    console.log(randomIndex);

    const card = {
      id: i,
      score: cardsScoreArray[roundGame][randomIndex],
      isPossitive: cardsScoreArray[roundGame][randomIndex] > 0,
      selectedByUsers: [],
    };

    cardsScoreArray[roundGame].splice(randomIndex, 1);

    cardsArray.push(card);
  }

  return cardsArray;
};
