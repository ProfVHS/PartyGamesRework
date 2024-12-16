import { createContext } from 'react';
import { roomType } from '../types/roomType.ts';

export const roomDataContext = createContext<roomType | undefined>(undefined);
