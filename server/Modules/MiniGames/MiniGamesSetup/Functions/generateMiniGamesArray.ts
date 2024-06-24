export const generateMiniGamesArray = (miniGamesLength: number) => {
  const GamesList = [
    'The Witcher 3: Wild Hunt',
    'Minecraft',
    'Among Us',
    'League of Legends',
    'Cyberpunk 2077',
    'Fortnite',
    'Call of Duty: Warzone',
    'Stardew Valley',
    'Hades',
    'Animal Crossing: New Horizons',
    'Super Mario Odyssey',
    'The Legend of Zelda: Breath of the Wild',
    'DOOM Eternal',
    'Red Dead Redemption 2',
    'Assassins Creed Valhalla',
    'Valorant',
    'Dark Souls III',
    'Civilization VI',
    'The Sims 4',
    'Genshin Impact',
  ];

  const miniGamesArray: string[] = [];

  while (miniGamesArray.length < miniGamesLength) {
    miniGamesArray.push(
      GamesList[Math.floor(Math.random() * GamesList.length)]
    );
  }

  return miniGamesArray;
};
