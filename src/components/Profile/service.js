import supabase from "../../utils/supabase"
import { setProfile } from "./profileSlice"

export const createProfile = (user) => {
    return async(dispatch) => {
        // check if profile exist
        // const existProfile = await supabase.from("Profile").select().eq('email', user.email)
        
        // // if yes
        // // then user is already present, dispatch the 

        // // if no
        // // the user is new, create the user
        // if(!existProfile.data){
        //     existProfile = await supabase.from("Profile").insert([
        //         {name: user.name, email: user.email, user_id: user.user_id}
        //     ])
        // }

        // // dispatch the setProfile action
        // dispatch(setProfile({
        //     id: user?.user_id,
        //     email: user?.email,
        //     userName: user?.name,
        //     avatar: user?.avatar,
        //     about: user?.about
        // }))

        console.log(user)
    }
}