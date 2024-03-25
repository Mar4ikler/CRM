import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../features/app/appSlice';

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    reducer: {
        app: appSlice,
    },
});

export default store;
