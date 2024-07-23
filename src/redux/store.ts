import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';

const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
