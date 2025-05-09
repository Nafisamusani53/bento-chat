import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // session: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    session: null,
    user: null,
    status: "idle", 
}


const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action){
            state.status = action.payload
        },
        logout(state, action){
            state.session = null;
            state.user = null;
            state.status = 'idle'
        },
        setUser(state, action){
            state.user = action.payload.user
            state.session = action.payload.session;
        }
    }
    
})
export const {setLoading, setSignUpData, logout, setUser} = authReducer.actions;

export default authReducer.reducer;
