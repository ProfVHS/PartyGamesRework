import { Minigame } from '../../../../Types/Minigame';

export const generateMiniGamesArray = (miniGamesLength: number) => {
  const GamesList: Minigame[] = [
    { minigameID: 'CTB', name: 'Click The Bomb' },
    { minigameID: 'CARDS', name: 'Cards' },
  ];

  const miniGamesArray: Minigame[] = [];
  var id = 0;

  console.log('Generating miniGamesArray', miniGamesLength);

  while (miniGamesArray.length < miniGamesLength) {
    const randomIndex = Math.floor(Math.random() * GamesList.length);

    miniGamesArray.push({
      id: id,
      minigameID: GamesList[randomIndex].minigameID,
      name: GamesList[randomIndex].name,
    });

    GamesList.splice(randomIndex, 1);
    id++;
  }

  return miniGamesArray;
};
