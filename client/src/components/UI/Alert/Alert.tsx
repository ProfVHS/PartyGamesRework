import { useEffect, useState } from 'react';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../common/Icons.tsx';
import './AlertStyle.scss';
import { useAnimate, motion } from 'framer-motion';

type AlertType = {
  message: string;
  type: 'error' | 'info' | 'warning' | 'success';
  duration?: number;
  onClose?: () => void;
};

export const Alert = ({ type, message, duration = 5, onClose }: AlertType) => {
  const [timer, setTimer] = useState<number>(duration);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    setTimer(duration - 1);
    animate(
      scope.current,
      { opacity: [0, 1], scale: [0, 1] },
      { type: 'spring', duration: 0.5 }
    );
  }, [animate, duration, scope]);

  useEffect(() => {
    if (timer < 0) {
      const exitAnimation = async () => {
        await animate(
          scope.current,
          { opacity: [1, 0], scale: [1, 0] },
          { duration: 0.5 }
        );
        onClose && onClose();
      };
      exitAnimation();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [animate, onClose, scope, timer]);

  return (
    <motion.div
      className={`alert alert--${type}`}
      ref={scope}
      initial={{ translateX: '-50%' }}
    >
      <div
        className="alert__progress"
        style={{ width: `${(timer / duration) * 100}%` }}
      />
      <div className="alert__icon">
        {type === 'success' && <SuccessIcon width={24} height={24} />}
        {type === 'error' && <ErrorIcon width={24} height={24} />}
        {type === 'warning' && <WarningIcon width={24} height={24} />}
        {type === 'info' && <InfoIcon width={24} height={24} />}
      </div>
      <div className="alert__message">{message}</div>
    </motion.div>
  );
};
