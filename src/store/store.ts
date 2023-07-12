import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import answersReducer from './answersSlice';

export const store = configureStore({
  reducer: {
    answers: answersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
