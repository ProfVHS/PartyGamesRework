import { getUsersLength } from '../../../../Database/Users/getUsersLength';

export const createMaxClicks = async (roomCode: string) => {
  const usersLength = await getUsersLength(roomCode);

  if (usersLength > 6) return Math.floor(Math.random() * 25) + 1;

  if (usersLength > 4) return Math.floor(Math.random() * 20) + 1;

  return Math.floor(Math.random() * 15) + 1;
};
