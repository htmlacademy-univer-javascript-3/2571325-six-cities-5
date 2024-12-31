import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './slices/offers-slice/offers-slice';
import { authReducer } from './slices/auth-slice/auth-slice';
import { commentsReducer } from './slices/comments-slice/comments-slice';
import { createAPI } from '../api/api';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
    auth: authReducer,
    comments: commentsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: createAPI(),
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
