import { createContext } from 'react';

export const usersDataContext = createContext<userType[] | undefined>(
  undefined
);
