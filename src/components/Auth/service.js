import { setLoading } from "./authSlice"
import supabase from "../../utils/supabase"
import toast from "react-hot-toast"
import { setProfile } from "../Profile/profileSlice"


export const signup = (authData, naviagte) => {
    return async( dispatch) => {
        dispatch(setLoading('loading'))
        // signup
        const { data, error } = await supabase.auth.signUp({
            email: authData.email,
            password: authData.password,
        }) 


        // if success
        if(data){
            // insert profile Data
            await supabase.from("User")
                .insert([
                    { id: data.user.id, userName: authData.userName, email: authData.email }
                ])

            // dispatch setProfile
            dispatch(setProfile({
                id: data.user.id,
                email: authData.email,
                userName: authData.userName
            }))
            naviagte('/')
        }
        if(error){
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
        // console.log(error)
        if(data){
            const {data, error} = await supabase.from('User').select().eq('email' , authData.email).single()
            dispatch(setProfile(data))
            navigate('/')
        }
        // // fail
        if(error){
            // show toast
            toast.error(error.message) 
        }
        
        dispatch(setLoading('idle'))
    }
}


export const googleAuth = async(navigate) => {
    // try{
    //    window.location.href = 'http://localhost:3000/api/v1/auth/google';
    // }  
    // catch(error){
    //     console.log(error)
    // }
    return
      
 }

 export const appleAuth = async(navigate) => {
    // try{
    //    window.location.href = 'http://localhost:3000/api/v1/auth/google';
    // }  
    // catch(error){
    //     console.log(error)
    // }
    return
      
 }

 export const sendResetPasswordLink = (email) => {

    return async(dispatch) => {

        dispatch(setLoading("loading"))
    
        const { data, error } = await supabase.auth.resetPasswordForEmail(email,{
            redirectTo : 'http://localhost:5173/reset-password'
        })

        dispatch(setLoading("idle"))
        if(data){
            toast.success("Link has been sent to you email")
        }
        if(error){
            toast.error("Please try again")
        }
    }

 }

export const resetPassword = (password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading("loading"))

        const { data, error } = await supabase.auth.updateUser({
            password: password
        })

        console.log(data)
        console.log(error)
         dispatch(setLoading("idle"))

        if (error) {
            toast.error("Please try again after sometime")
        }

        navigate('/')
        
    }
}