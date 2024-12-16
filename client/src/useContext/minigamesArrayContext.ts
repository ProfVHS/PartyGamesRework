import { createContext } from 'react';
import { MinigameType } from '../types/Minigame.ts';

export const minigamesArrayContext = createContext<MinigameType[] | undefined>(
  undefined
);
