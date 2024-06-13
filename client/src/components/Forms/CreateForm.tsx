import './FormStyle.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { socket } from '../../socket';

interface FormInputs {
  nickname: string;
  room: string;
}

type CreateFormProps = {
  onCancel: () => void;
};

const randomRoomCode = () => {
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
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm<FormInputs>();
  const roomCode = randomRoomCode();

  const onJoin: SubmitHandler<FormInputs> = (data) => {
    const nickname = data.nickname;

    socket.emit('create_room', roomCode, nickname);
  };

  useEffect(() => {
    socket.on('cannot_join', () => {
      const roomCode = randomRoomCode();

      socket.emit('create_room', roomCode);
    });
    socket.on('can_join', () => {
      navigator('/room');
    });

    return () => {
      socket.off('cannot_join');
      socket.off('can_join');
    };
  }, [socket]);

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
