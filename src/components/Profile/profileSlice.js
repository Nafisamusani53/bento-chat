import { createSlice } from "@reduxjs/toolkit"

const profile = localStorage.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))
    : null;

const initialState = {
    id: profile?.id || '',
    userName: profile?.userName || '',
    email: profile?.email || '',
    avatar: profile?.avatar || '',
    about: profile?.about || '',
};

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
            delete state.id;
            delete state.email;
            delete state.userName;
            delete state.avatar;
            delete state.about;
        },
        setProfile(state, action){
            const data = action.payload
            state.id = data.id;
            state.email = data.email;
            state.userName = data.userName;
            state.avatar = data.avatar || '';
            state.about = data.about || ''
        }
    }
})

export const {updateProfile, deleteProfile, setProfile} = profileReducer.actions;

export default profileReducer.reducer;