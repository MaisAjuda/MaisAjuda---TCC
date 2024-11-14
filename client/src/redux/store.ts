
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/UserSlice/UserSlice';
import espReducer from '../Slice/espSlice/espSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    esp: espReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
