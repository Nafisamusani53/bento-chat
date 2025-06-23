import { setLoading, setLogout } from "../reducers/authSlice"
import supabase from "../utils/supabase"
import toast from "react-hot-toast"
import { deleteProfile, setProfile } from "../reducers/profileSlice"
import {localStorageName } from "../utils/constant"
import { clearChat } from "../reducers/ChatSlice"
import { resetNavigation } from "../reducers/navigationSlice"


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
            const about = `I'am availbale`
            const avatar = `https://api.dicebear.com/5.x/initials/svg?seed=${authData.userName}`
            // insert profile Data
            const userData = { 
                        id: data.user.id, 
                        username: authData.userName, 
                        email: authData.email,
                        about: about,
                        avatar: avatar
                    }
            await supabase.from("User")
                .insert([
                    userData
                ])

            // dispatch setProfile
            dispatch(setProfile(userData))
            localStorage.setItem('profile', JSON.stringify(userData))
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
         dispatch(setLoading('idle'))
         if(error){
            // show toast
            toast.error(error.message) 
        }
        // success
        if(data){
            const {data, error} = await supabase.from('User').select().eq('email' , authData.email).single()
            await dispatch(setProfile(data))
            localStorage.setItem('profile', JSON.stringify(data))
            navigate('/')
        }
        //
       
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
            redirectTo : 'https://bento-chat.vercel.app/reset-password'
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

         dispatch(setLoading("idle"))

        if (error) {
            toast.error("Please try again after sometime")
        }

        navigate('/')
        
    }
}

export const logout = () => {
    return async(dispatch) => {
        const {error} = await supabase.auth.signOut()
        if(!error){
            localStorage.removeItem(localStorageName.profile)
            dispatch(setLogout())
            dispatch(deleteProfile())
            dispatch(clearChat())
            dispatch(resetNavigation())
        }
    }
}

export const deleteAccount = (userId, token, handleClose) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase.functions.invoke('delete-user-and-update-chat', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      userId,
    },
  });

        dispatch(deleteProfile());
        dispatch(setLogout());
        toast.success("Account deleted successfully");
        localStorage.removeItem(localStorageName.profile)
        dispatch(logout())
        handleClose()

    } catch (error) {
      toast.error("Please try after some time")
    }
  };
};
