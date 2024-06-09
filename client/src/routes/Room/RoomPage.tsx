import { Camera } from '../../components/features/camera/Camera';
import './Room.scss';
import Peer from 'peerjs';

export const RoomPage = () => {
  const peer = new Peer('Peer-id', {
    host: 'localhost',
    port: 9000,
    path: '/',
  });

  return (
    <div className="room">
      <div className="room__grid">
        <Camera nickname={'Ultra Mango Guy'} score={0} />

        <div className="room__content"></div>
      </div>
    </div>
  );
};
