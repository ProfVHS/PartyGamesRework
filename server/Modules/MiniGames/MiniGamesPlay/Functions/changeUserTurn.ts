import { db } from '../../../../Database/database';
import { getUsersLength } from '../../../../Database/Users/getUsersLength';
import { userType } from '../../../../Types/userType';

export const changeUserTurn = async (roomCode: string) => {
  await new Promise<void>((resolve, reject) => {
    db.get(
      'SELECT turn FROM rooms WHERE id = ?',
      [roomCode],
      (err: Error, row: { turn: number }) => {
        if (err) {
          console.error('changeUserTurn.ts');
          console.error(err.message);
          reject(err);
        }

        getUsersLength(roomCode).then((usersLength) => {
          changeTurn(usersLength, row.turn + 1);
          resolve();
        });
      }
    );
  });
};

const changeTurn = async (usersLength: number, turn: number) => {
  if (turn > usersLength) {
    changeTurn(usersLength, 1);
  } else {
    console.log('changeTurn', turn);
    await new Promise<number>((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE position_in_room = ?',
        [turn],
        (err: Error, user: userType) => {
          if (err) {
            console.error('changeUserTurn.ts SELECT User');
            console.error(err.message);
            reject(err);
          }
          if (!user.alive || user.isDisconnected) {
            changeTurn(usersLength, turn + 1);
          }

          db.run(
            'UPDATE rooms SET turn = ? WHERE id = ?',
            [turn, user.room_id],
            (err) => {
              if (err) {
                console.error('changeUserTurn.ts UPDATE turn');
                console.error(err.message);
                reject(err);
              }

              resolve(turn);
            }
          );
        }
      );
    });
  }
};
