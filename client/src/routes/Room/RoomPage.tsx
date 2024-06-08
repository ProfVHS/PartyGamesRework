import { Camera } from '../../components/features/camera/Camera';
import './Room.scss';

export const RoomPage = () => {
  return (
    <div className="room">
      <div className="room__grid">
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <Camera nickname="Ultra Mango Guy" score={0} />
        <div className="room__content"></div>
      </div>
    </div>
  );
};
