import './CameraStyle.scss';

type CameraProps = {
  nickname: string;
  score: number;
  videoId: string;
};

export const Camera = ({ nickname, score, videoId }: CameraProps) => {
  return (
    <div className="camera__wrapper">
      <div className="camera__box">
        <span className="camera__nickname">{nickname}</span>
        <video id={`${videoId}`} className="camera__video"></video>
        <span className="camera__score">Score: {score}</span>
      </div>
    </div>
  );
};
