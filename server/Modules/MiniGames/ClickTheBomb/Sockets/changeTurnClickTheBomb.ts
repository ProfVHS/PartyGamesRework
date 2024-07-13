import { Socket } from 'socket.io';
import { changeUserTurn } from '../../MiniGamesPlay/Functions/changeUserTurn';

export const changeTurnClickTheBomb = (socket: Socket) => {
  socket.on('change_turn_click_the_bomb', (roomCode: string) => {
    changeUserTurn(roomCode);
  });
};
