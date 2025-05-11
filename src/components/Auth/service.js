import { setLoading } from "./authSlice"
import supabase from "../../utils/supabase"
import toast from "react-hot-toast"
import { setProfile } from "../../slice/profileSlice"


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
            // insert profile Data
            await supabase.from("Profile")
                .insert([
                    { user_id: data.user.id, userName: authData.userName, email: authData.email }
                ])

            // dispatch setProfile
            dispatch(setProfile({
                id: data.user.id,
                email: authData.email,
                userName: authData.userName
            }))
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
            const {data, error} = await supabase.from('Profile').select().eq('email' , authData.email)
            dispatch(setProfile(data[0]))
            navigate('/')
        }
        // fail
        else{
            // show toast
            toast.error("Please try again after some time") 
        }
        
        dispatch(setLoading('idle'))
    }
}


export const googleAuth = () => async (dispatch) => {
    try {
      console.log("Starting Google auth...");
      
      // Step 1: Initiate Google OAuth
      const { data: authData, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin, // Important for OAuth flow
        }
      });
  
      if (authError) console.log(authError);
  
      console.log("OAuth response:", authData);
      
      // Step 2: Get the authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) throw userError || new Error("No user found");
      
      console.log("Authenticated user:", user);
      
      // Step 3: Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('Profile')
        .select()
        .eq('email', user.email)
        .single(); // Use single() if you expect one record
  
      if (profileError) throw profileError;
      
      // Step 4: Update Redux state
      dispatch(setProfile(profileData));
      
      // Step 5: Navigate
      navigate('/');
      
    } catch (error) {
      console.error("Google auth failed:", error);
      console.log(error.message)
      toast.error(error.message || "Please try again after some time");
    }
  };