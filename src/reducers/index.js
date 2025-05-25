import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from '../components/Profile/profileSlice'
import authReducer from '../components/Auth/authSlice'
import navigationReducer from '../components/Panels/NavigationPanel/navigationSlice'

const rootReducer = combineReducers({
    profile: profileReducer,
    auth: authReducer,
    navigation: navigationReducer

})
export default rootReducer;