import { userType } from './userType.ts';

export type CardsType = {
  id: number;
  score: number;
  isPossitive: boolean;
  selectedByUsers?: userType[];
  flip: boolean;
};
