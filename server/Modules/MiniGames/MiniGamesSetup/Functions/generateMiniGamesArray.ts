import { Minigame } from '../../../../Types/Minigame';

export const generateMiniGamesArray = (miniGamesLength: number) => {
  const GamesList: Minigame[] = [
    { minigame_id: 'CTB', name: 'Click The Bomb' },
    { minigame_id: 'CARDS', name: 'Cards' },
  ];

  const miniGamesArray: Minigame[] = [];
  var id = 0;

  while (miniGamesArray.length < miniGamesLength) {
    const randomIndex = Math.floor(Math.random() * GamesList.length);

    miniGamesArray.push({
      id: id,
      minigame_id: GamesList[randomIndex].minigame_id,
      name: GamesList[randomIndex].name,
    });

    GamesList.splice(randomIndex, 1);
    id++;
  }

  return miniGamesArray;
};
