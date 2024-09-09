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
          return reject(err);
        }

        getUsersLength(roomCode).then(async (usersLength) => {
          changeTurn(socket, usersLength, row.turn + 1);
          resolve();
        });
      }
    );
  });
};

const changeTurn = async (
  socket: Socket,
  usersLength: number,
  turn: number
) => {
  if (turn > usersLength) {
    changeTurn(socket, usersLength, 1);
  } else {
    return await new Promise<userType>((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE position_in_room = ?',
        [turn],
        (err: Error, user: userType) => {
          if (err) {
            console.error('changeUserTurn.ts SELECT User');
            console.error(err.message);
            return reject(err);
          }
          if (!user.alive || user.isDisconnected) {
            changeTurn(socket, usersLength, turn + 1);
          }

          db.run(
            'UPDATE rooms SET turn = ? WHERE id = ?',
            [turn, user.room_id],
            (err) => {
              if (err) {
                console.error('changeUserTurn.ts UPDATE turn');
                console.error(err.message);
                return reject(err);
              }

              socket.nsp.to(user.room_id).emit('update_turn', user);

              resolve(user);
            }
          );
        }
      );
    });
  }
};
