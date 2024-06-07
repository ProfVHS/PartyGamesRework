import { JoinForm } from '../../components/Forms/JoinForm';
import './styles.scss';
import logo from '../../assets/textures/logo.svg';
import { RowLayout } from '../../components/layouts/RowLayout';
import { Button } from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { CreateForm } from '../../components/Forms/CreateForm';
import { useAnimate } from 'framer-motion';

export const HomePage = () => {
  const [scope, animate] = useAnimate();
  const [status, setStatus] = useState<'selecting' | 'join' | 'create'>(
    'selecting'
  );

  const changeStatus = async (status: 'join' | 'create') => {
    animate(
      scope.current,
      { scale: [1, 0.5], opacity: [1, 0] },
      { duration: 0.5, type: 'spring' }
    );
    setStatus(status);
  };

  useEffect(() => {
    animate(
      scope.current,
      { scale: [0.5, 1], opacity: [0, 1] },
      { duration: 0.5, type: 'spring' }
    );
  }, [status]);

  return (
    <div className="home">
      <div className="home__content">
        <img src={logo} alt="logo" draggable={false} />
        <span className="home__title">Party Games</span>
        <div className="home__forms" ref={scope}>
          {status === 'selecting' && (
            <RowLayout ref={scope}>
              <Button
                style={{ width: '50%' }}
                onClick={() => changeStatus('create')}
              >
                Create Room
              </Button>
              <Button
                style={{ width: '50%' }}
                onClick={() => changeStatus('join')}
              >
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
    </div>
  );
};
