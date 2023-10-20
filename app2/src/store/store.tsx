
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./Session/sessionSlice";

const reducers = combineReducers({
    session: sessionSlice
});

const store = configureStore({
    reducer: reducers,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;