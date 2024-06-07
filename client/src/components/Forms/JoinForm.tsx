import './FormStyle.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../Button/Button';
import { RowLayout } from '../layouts/RowLayout';
import { useNavigate } from 'react-router-dom';

interface FormInputs {
  nickname: string;
  room: string;
}

type JoinFormProps = {
  onCancel: () => void;
};

export const JoinForm = ({ onCancel }: JoinFormProps) => {
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm<FormInputs>();

  const onJoin: SubmitHandler<FormInputs> = (data) => {
    console.log('join', data);
    navigator('/room');
  };

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
