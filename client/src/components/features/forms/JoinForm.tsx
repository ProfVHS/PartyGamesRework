import './FormStyle.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../UI/Button/Button.tsx';
import { RowLayout } from '../../layouts/RowLayout.tsx';
import { socket } from '../../../socket.ts';
import { useJoinRoom } from '../../../hooks/useJoinRoom.ts';

interface FormInputs {
  nickname: string;
  room: string;
}

type JoinFormProps = {
  onCancel: () => void;
};

export const JoinForm = ({ onCancel }: JoinFormProps) => {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onJoin: SubmitHandler<FormInputs> = (data) => {
    const storageUserId = localStorage.getItem('socket-id');

    socket.emit('join_room', data.room, data.nickname, storageUserId);
  };

  useJoinRoom(socket);

  return (
    <form className="form" onSubmit={handleSubmit(onJoin)} onReset={onCancel}>
      <input
        className="form-input"
        style={{ width: '100%' }}
        type="text"
        id="name"
        placeholder="Nickname"
        {...register('nickname')}
      />

      <RowLayout>
        <Button style={{ width: '50%' }} type="submit">
          Join
        </Button>
        <input
          className="form-input"
          style={{ width: '50%' }}
          type="text"
          id="room"
          placeholder="Room Code"
          {...register('room', { required: true, maxLength: 5 })}
        />
      </RowLayout>
      <Button style={{ width: '100%' }} type="reset">
        Go Back
      </Button>
    </form>
  );
};