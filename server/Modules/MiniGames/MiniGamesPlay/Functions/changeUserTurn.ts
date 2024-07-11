import { Socket } from 'socket.io';
import { db } from '../../../../Database/database';
import { getUsersLength } from '../../../../Database/Users/getUsersLength';
import { userType } from '../../../../Types/userType';

export const changeUserTurn = async (roomCode: string) => {
  await new Promise<void>((resolve, reject) => {
    db.get(
      'SELECT turn FROM rooms WHERE id = ?',
      [roomCode],
      (err: Error, turn: number) => {
        if (err) {
          console.error('changeUserTurn.ts');
          console.error(err.message);
          reject(err);
        }
        getUsersLength(roomCode).then((usersLength) => {
          changeTurn(usersLength, turn + 1).then(async (userTurn: number) => {
            console.log('User turn: ' + userTurn);
            resolve();
          });
        });
      }
    );
  });
};

const changeTurn = async (usersLength: number, turn: number) => {
  if (turn == usersLength) {
    changeTurn(usersLength, 1);
  }

  return await new Promise<number>((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE turn = ?',
      [turn],
      (err: Error, user: userType) => {
        if (!user.alive || user.isDisconnected) {
          changeTurn(usersLength, turn + 1);
        }

        db.run(
          'UPDATE rooms SET turn = ? WHERE id = ?',
          [turn, user.room_id],
          (err) => {
            if (err) {
              console.error('changeUserTurn.ts');
              console.error(err.message);
              reject(err);
            }

            resolve(turn);
          }
        );
      }
    );
  });
};
