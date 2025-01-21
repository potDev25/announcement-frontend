import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import registerReducer from './slice/registerSlice'
import announcementsReducer from './slice/announcementSlice'
import guestReducer from './slice/guestSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        announcements: announcementsReducer,
        guest: guestReducer
    }
});
