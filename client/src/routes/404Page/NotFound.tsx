import './NotFound.scss';
import { Button } from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigator = useNavigate();
  const goHome = () => navigator('/');
  return (
    <div className="not-found">
      <div className="not-found__content">
        <span className="not-found__title">404</span>
        <span className="not-found__subtitle">Page not found</span>
        <span className="not-found__description">
          The page you are looking for, does not exist.
        </span>
        <Button onClick={goHome}>Go to Homepage</Button>
      </div>
    </div>
  );
};
