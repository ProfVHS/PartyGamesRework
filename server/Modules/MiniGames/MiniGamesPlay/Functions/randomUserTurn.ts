import { db } from '../../../../Database/database';
import { getUsersLength } from '../../../../Database/Users/getUsersLength';

export const randomUserTurn = async (roomCode: string) => {
  const usersLenght = await getUsersLength(roomCode);

  const randomUser = Math.floor(Math.random() * usersLenght) + 1;

  db.run(`UPDATE rooms SET turn = ? WHERE id = ?`, [randomUser, roomCode]);
};
