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

export const CreateForm = ({ onCancel }: CreateFormProps) => {
  const [scope, animate] = useAnimate();
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm<FormInputs>();

  const randomRoomCode = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    while (result.length < 5) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  };

  const onJoin: SubmitHandler<FormInputs> = (data) => {
    const { nickname } = data;

    const roomCode = randomRoomCode();

    socket.emit('create_room', roomCode, nickname);

    navigator('/room');
  };

  useEffect(() => {}, []);

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
