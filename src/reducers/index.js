import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from './profileSlice'
import authReducer from './authSlice'
import navigationReducer from './navigationSlice'
import chatReducer from './ChatSlice'
import trackUserReducer from './TrackUserSlice'

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    navigation: navigationReducer,
    chat: chatReducer,
    trackUser: trackUserReducer,

})
export default rootReducer;