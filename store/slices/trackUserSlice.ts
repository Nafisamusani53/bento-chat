import { PresenceState } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TrackUserState {
  presence: PresenceState
}

const initialState: TrackUserState = {
  presence: {},
}

const trackUserReducer = createSlice({
    name: "trackUser",
    initialState,
    reducers :{
        setPresence(state, action: PayloadAction<PresenceState>){
            state.presence = { ...action.payload };
        },
    }
})

export const {setPresence} = trackUserReducer.actions;

export default trackUserReducer.reducer;