import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    presence : {}
}

const trackUserReducer = createSlice({
    name: "trackUser",
    initialState,
    reducers :{
        setPresence(state, action){
            state.presence = { ...action.payload };
        },
    }
})

export const {setPresence} = trackUserReducer.actions;

export default trackUserReducer.reducer;