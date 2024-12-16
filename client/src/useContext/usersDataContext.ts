import { createContext } from 'react';
import { userType } from '../types/userType.ts';

export const usersDataContext = createContext<userType[] | undefined>(
  undefined
);
