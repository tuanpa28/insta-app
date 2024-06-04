import { IAction, IState } from '@/interfaces/store';
import { Dispatch, createContext } from 'react';
import { initState } from './reducer';

const StoreContext = createContext<[IState, Dispatch<IAction>]>([initState, () => null]);

export default StoreContext;
