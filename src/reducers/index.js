import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from '../components/Profile/profileSlice'
import authReducer from '../components/Auth/authSlice'

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,

})
export default rootReducer;