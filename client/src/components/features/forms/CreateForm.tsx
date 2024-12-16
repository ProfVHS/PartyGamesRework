import './FormStyle.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../UI/Button/Button.tsx';
import { useAnimate } from 'framer-motion';
import { socket } from '../../../socket.ts';
import { useJoinRoom } from '../../../hooks/useJoinRoom.ts';
import { randomRoomCode } from '../../../utils/RandomRoomCode.ts';

interface FormInputs {
  nickname: string;
  room: string;
}

type CreateFormProps = {
  onCancel: () => void;
};

export const CreateForm = ({ onCancel }: CreateFormProps) => {
  const [scope] = useAnimate();
  const { register, handleSubmit } = useForm<FormInputs>();
  const roomCode = randomRoomCode();

  const onJoin: SubmitHandler<FormInputs> = (data) => {
    const nickname = data.nickname;
    const storageUserId = localStorage.getItem('socket-id');

    socket.emit('create_room', roomCode, nickname, storageUserId);
  };

  useJoinRoom(socket);

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onJoin)}
      onReset={onCancel}
      ref={scope}
    >
      <input
        className="form-input"
        style={{ width: '100%' }}
        type="text"
        id="name"
        placeholder="Nickname"
        {...register('nickname')}
      />

      <Button style={{ width: '100%' }} type="submit">
        Create
      </Button>
      <Button style={{ width: '100%' }} type="reset">
        Go Back
      </Button>
    </form>
  );
};
