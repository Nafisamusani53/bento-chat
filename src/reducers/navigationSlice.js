import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    search : true,
    settings: false,
    profile: false,
}

const navigationReducer = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setNavigation(state, action){
            const tabs = Object.keys(state).reduce((acc, key) => {
            acc[key] = key === action.payload;
            return acc;
        }, {});
        return tabs
        },
        resetNavigation(state, action){
            state.search = true;
            state.settings = false;
            state.profile = false;
        }
    }
})

export const {setNavigation, resetNavigation} = navigationReducer.actions

export default navigationReducer.reducer