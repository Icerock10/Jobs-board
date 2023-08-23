import { createContext, Dispatch, SetStateAction } from 'react';
import { Theme, Themes } from '@/utils/types/types';

export const DarkModeContext = createContext<Theme>(Themes.DARK);
export const SetDarkModeContext = createContext<Dispatch<SetStateAction<Theme>>>((value) => value)
