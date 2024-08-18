import { Socket } from 'socket.io';
import { userType } from '../../../../Types/userType';
import { CardsType } from '../../../../Types/cardsType';
import { addScoreUser } from '../../../User/Functions/addScoreUser';
import { sendUsersData } from '../../../User/Functions/sendUsersData';

export const updateUserScoreCards = async (socket: Socket) => {
  socket.on(
    'update_user_score_cards',
    async (usersSelectedCardId: userType[], card: CardsType) => {
      usersSelectedCardId.forEach(async (user) => {
        let score = 0;
        if (card.isPossitive) {
          score = card.score / usersSelectedCardId.length;
        } else {
          score = card.score * usersSelectedCardId.length;
        }

        await addScoreUser(user.id, score);
        await sendUsersData(socket, user.room_id);
      });
    }
  );
};
