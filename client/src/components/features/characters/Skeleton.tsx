// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ReactComponent as SkeletonAlive } from '../../../assets/characters/skeleton/alive.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ReactComponent as SkeletonDead } from '../../../assets/characters/skeleton/dead.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { ReactComponent as SkeletonDisconnected } from '../../../assets/characters/skeleton/disconnected.svg';

export const Skeleton = ({ alive = false, isDisconnected = false }) => {

  return (
    <>
      {isDisconnected ? <SkeletonDisconnected /> : alive ? <SkeletonAlive /> : <SkeletonDead />}
    </>
  );
};