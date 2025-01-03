import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../api/api';
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof createAPI>, Action>;
