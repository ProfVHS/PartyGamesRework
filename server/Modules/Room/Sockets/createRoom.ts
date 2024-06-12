import { Socket } from 'socket.io';
import { db } from '../../../Database/database';
import { sendUsersData } from '../../../Database/Users/sendUsersData';
import { checkRoomExistence } from '../../../Database/Room/checkRoomExistence';
import { sendRoomData } from '../../../Database/Room/sendRoomData';

export const createRoom = async (socket: Socket) => {
  socket.on('create_room', async (roomCode: string, nickname: string) => {
    await new Promise<void>(async (resolve) => {
      db.run(`INSERT INTO rooms (id) VALUES (?)`, [roomCode], (err) => {
        if (err) {
          console.error('createRoom.ts: Room Insert');
          console.error(err.message);
        } else {
          console.log('Room created');
        }
      });
      db.run(
        `INSERT INTO users (id, nickname, score, room_id) VALUES (?, ?, ?, ?)`,
        [socket.id, nickname, 100, roomCode],
        (err) => {
          if (err) {
            console.error('createRoom.ts: Users Insert');
            console.error(err.message);
          } else {
            console.log('User created');
            resolve();
          }
        }
      );
    }).then(async () => {
      socket.join(roomCode);

      sendUsersData(socket, roomCode);
      sendRoomData(socket, roomCode);
    });
  });
};
