import './CameraStyle.scss';
import { Skeleton } from '../characters/Skeleton.tsx';

type CameraProps = {
  nickname: string;
  score: number;
  alive: boolean;
  isDisconnected: boolean;
};

export const Camera = ({
  nickname,
  score,
  alive,
  isDisconnected,
}: CameraProps) => {
  return (
    <div className="camera__wrapper">
      <div className="camera__box">
        <span className="camera__nickname">{nickname}</span>
        <div className="camera__video">
          <Skeleton isDisconnected={isDisconnected} alive={alive} />
        </div>
        <span className="camera__score">Score: {score}</span>
      </div>
    </div>
  );
};
