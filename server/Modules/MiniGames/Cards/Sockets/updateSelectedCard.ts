import { Socket } from 'socket.io';
import { updateSelectedIdUser } from '../../../User/Functions/updateSelectedIdUser';

export const updateSelectedCard = (socket: Socket) => {
  socket.on('update_selected_card', async (userId: string, cardId: number) => {
    await updateSelectedIdUser(userId, cardId);
  });
};
