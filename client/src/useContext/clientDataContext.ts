import { createContext } from 'react';
import { userType } from '../types/userType.ts';

export const clientDataContext = createContext<userType | undefined>(undefined);
