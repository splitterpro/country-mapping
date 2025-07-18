import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
//slices
import countriesReducer from './slices/countriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 