import { createSlice } from "@reduxjs/toolkit"

const profile = localStorage.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))
    : null;

const initialState = {
    id: profile?.id || '',
    username: profile?.username || '',
    email: profile?.email || '',
    avatar: profile?.avatar || '',
    about: profile?.about || '',
};

const profileReducer = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateAvatar(state, action){
            state.avatar = action.payload
        },
        updateName(state, action){
            state.username = action.payload
        },
        updateAbout(state, action){
            state.about = action.payload
        },
        deleteProfile(state, action){
            delete state.id;
            delete state.email;
            delete state.username;
            delete state.avatar;
            delete state.about;
        },
        setProfile(state, action){
            const data = action.payload
            state.id = data.id;
            state.email = data.email;
            state.username = data.username;
            state.avatar = data.avatar || '';
            state.about = data.about || ''
        }
    }
})

export const {deleteProfile, setProfile, updateAbout, updateAvatar, updateName} = profileReducer.actions;

export default profileReducer.reducer;