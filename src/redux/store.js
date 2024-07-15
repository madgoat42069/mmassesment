import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { musicApi } from './Services/shazamcore';

export const store = configureStore({
  reducer: {
    [musicApi.reducerPath]: musicApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware),
});
