import { JoinForm } from '../../components/Forms/JoinForm';
import './styles.scss';
import logo from '../../assets/textures/logo.svg';
import { RowLayout } from '../../components/layouts/RowLayout';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { CreateForm } from '../../components/Forms/CreateForm';

export const HomePage = () => {
  const [status, setStatus] = useState<'selecting' | 'join' | 'create'>(
    'selecting'
  );

  return (
    <div className="home">
      <div className="home__content">
        <img src={logo} alt="logo" draggable={false} />
        <span className="home__title">Party Games</span>
        {status === 'selecting' && (
          <RowLayout>
            <Button
              style={{ width: '50%' }}
              onClick={() => setStatus('create')}
            >
              Create Room
            </Button>
            <Button style={{ width: '50%' }} onClick={() => setStatus('join')}>
              Join Room
            </Button>
          </RowLayout>
        )}
        {status === 'join' && (
          <JoinForm onCancel={() => setStatus('selecting')} />
        )}
        {status === 'create' && (
          <CreateForm onCancel={() => setStatus('selecting')} />
        )}
      </div>
    </div>
  );
};
