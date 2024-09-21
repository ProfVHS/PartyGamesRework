import './FormStyle.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../UI/Button/Button';
import { useAnimate } from 'framer-motion';
import { socket } from '../../socket';
import { useJoinRoom } from '../../hooks/useJoinRoom';

interface FormInputs {
  nickname: string;
  room: string;
}

type CreateFormProps = {
  onCancel: () => void;
};

export const randomRoomCode = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  while (result.length < 5) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const CreateForm = ({ onCancel }: CreateFormProps) => {
  const [scope, animate] = useAnimate();
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
