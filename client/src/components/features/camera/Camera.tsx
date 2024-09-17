import './CameraStyle.scss';

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
        <video className="camera__video"></video>
        <span className="camera__score">Score: {score}</span>

        {isDisconnected ? (
          <span>Disconnected</span>
        ) : alive ? (
          <span>Alive</span>
        ) : (
          <span>Dead</span>
        )}
      </div>
    </div>
  );
};
