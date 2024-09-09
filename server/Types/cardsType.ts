import { userType } from './userType';

export type CardsType = {
  id: number;
  score: number;
  isPossitive: boolean;
  selectedByUsers?: userType[];
};
