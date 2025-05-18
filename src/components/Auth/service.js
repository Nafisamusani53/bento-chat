import { setLoading } from "./authSlice"
import supabase from "../../utils/supabase"
import toast from "react-hot-toast"
import { setProfile } from "../Profile/profileSlice"
import axios from "axios"


export const signup = (authData, naviagte) => {
    return async( dispatch) => {
        dispatch(setLoading('loading'))
        // signup
        const { data, errors } = await supabase.auth.signUp({
            email: authData.email,
            password: authData.password,
        }) 


        // if success
        if(data){
        //     // insert profile Data
        //     await supabase.from("Profile")
        //         .insert([
        //             { user_id: data.user.id, userName: authData.userName, email: authData.email }
        //         ])

        //     // dispatch setProfile
        //     dispatch(setProfile({
        //         id: data.user.id,
        //         email: authData.email,
        //         userName: authData.userName
        //     }))
            naviagte('/')
        }
        if(errors){
            // show toast
            toast.error("Please try again after some time")
        }
        dispatch(setLoading('idle'))
        // dispatch setLoading to idle
    }
}

export const login = (authData, navigate) => {
    return async(dispatch) => {
        dispatch(setLoading('loading'))

        // sign in using auth
        const {data, error}  = await supabase.auth.signInWithPassword({
            email : authData.email,
            password: authData.password,
        })

        // success
        if(data){
        //     const {data, error} = await supabase.from('Profile').select().eq('email' , authData.email)
        //     dispatch(setProfile(data[0]))
            navigate('/')
        }
        // // fail
        else{
            // show toast
            toast.error("Please try again after some time") 
        }
        
        dispatch(setLoading('idle'))
    }
}


export const googleAuth = async(navigate) => {
    try{
       window.location.href = 'http://localhost:3000/api/v1/auth/google';
    }  
    catch(error){
        console.log(error)
    }
      
 }