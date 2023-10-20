import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    session: null,
};
export const sessionSlice = createSlice({
    name: "session",
    initialState: initialValue,
    reducers: {
        setSession: (state,action) => {
            state.session = action.payload;
        }
    },
});
export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;