import { Minigame } from '../../../../Types/Minigame';

export const generateMiniGamesArray = (miniGamesLength: number) => {
  const GamesList: Minigame[] = [
    { minigameID: 'Witcher', name: 'The Witcher 3: Wild Hunt' },
    { minigameID: 'MC', name: 'Minecraft' },
    { minigameID: 'US', name: 'Among Us' },
    { minigameID: 'LOL', name: 'League of Legends' },
    { minigameID: 'CP77', name: 'Cyberpunk 2077' },
    { minigameID: 'FT', name: 'Fortnite' },
    { minigameID: 'COD', name: 'Call of Duty: Warzone' },
    { minigameID: 'SV', name: 'Stardew Valley' },
    { minigameID: 'H', name: 'Hades' },
    { minigameID: 'ACNH', name: 'Animal Crossing: New Horizons' },
    { minigameID: 'SMO', name: 'Super Mario Odyssey' },
    { minigameID: 'TLZ', name: 'The Legend of Zelda: Breath of the Wild' },
    { minigameID: 'DOOM', name: 'DOOM Eternal' },
    { minigameID: 'RDR2', name: 'Red Dead Redemption 2' },
    { minigameID: 'ACV', name: 'Assassins Creed Valhalla' },
    { minigameID: 'V', name: 'Valorant' },
    { minigameID: 'DS3', name: 'Dark Souls III' },
    { minigameID: 'C6', name: 'Civilization VI' },
    { minigameID: 'SIM4', name: 'The Sims 4' },
    { minigameID: 'GI', name: 'Genshin Impact' },
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
