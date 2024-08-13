import { getAliveUsersLength } from '../../../../Database/Users/getAliveUsersLength';

export const createMaxClicks = async (roomCode: string) => {
  const aliveUsersLength = await getAliveUsersLength(roomCode);

  if (aliveUsersLength > 6) return Math.floor(Math.random() * 25) + 1;

  if (aliveUsersLength > 4) return Math.floor(Math.random() * 20) + 1;

  return Math.floor(Math.random() * 15) + 1;
};
