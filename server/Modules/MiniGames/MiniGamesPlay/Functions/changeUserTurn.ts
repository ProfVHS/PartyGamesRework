import { db } from '../../../../Database/database';
import { Socket } from 'socket.io';
import { userType } from '../../../../Types/userType';
import { getUsersLength } from '../../../../Database/Users/getUsersLength';
import { getRoomData } from '../../../../Database/Room/getRoomData';
import { getUsersData } from '../../../../Database/Users/getUsersData';

export const changeUserTurn = async (socket: Socket, roomCode: string) => {
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

        getUsersLength(roomCode).then(async (usersLength) => {
          changeTurn(usersLength, row.turn + 1);

          const room = await getRoomData(roomCode);
          const users = await getUsersData(roomCode);

          const user = users.find(
            (user) => user.position_in_room === room.turn
          );

          socket.nsp.to(roomCode).emit('update_turn', user);

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
