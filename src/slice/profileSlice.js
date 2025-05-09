import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user_id: '',
    userName: '',
    email: '',
    avatar: '',
    about: ''
}

const profileReducer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action){
            const data = action.payload;
            state.userName = data.userName;
            state.avatar = data.avatar;
            state.about = data.about;
        },
        deleteProfile(state, action){
            delete state.user_id;
            delete state.email;
            delete state.userName;
            delete state.avatar;
            delete state.about;
        },
        setProfile(state, action){
            const data = action.payload
            state.user_id = data.user_id;
            state.email = data.email;
            state.userName = data.userName;
            state.avatar = data.avatar || '';
            state.about = data.about || ''
        }
    }
})

export const {updateProfile, deleteProfile, setProfile} = profileReducer.actions;

export default profileReducer.reducer;