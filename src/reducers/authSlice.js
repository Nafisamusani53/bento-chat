import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    status: "idle", 
}


const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action){
            state.status = action.payload
        },
        setLogout(state, action){
            state.token = null;
            state.status = 'idle'
        },
        setToken(state, action){
            state.token = action.payload;
        }
    }
    
})
export const {setLoading, setLogout, setToken} = authReducer.actions;

export default authReducer.reducer;
