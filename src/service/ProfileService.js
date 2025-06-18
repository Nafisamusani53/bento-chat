import toast from "react-hot-toast";
import supabase from "../utils/supabase"
import { extractFilePathFromUrl } from "../utils/helpers";
import { deleteFile, uploadFile } from "../utils/storageUtils";
import { AvatarStorage } from "../utils/constant";
import { updateAbout, updateAvatar, updateName } from "../reducers/profileSlice";

export const updateUserName = (name, id) => {
    return async(dispatch) => {
        const {data, error} = await supabase.from("User").update({username: name}).eq("id", id);
        if(!error){
            const user = JSON.parse(localStorage.getItem("profile"))
            localStorage.setItem("profile", JSON.stringify({...user, username:name}));
            dispatch(updateName(name));
        }
        else{
            toast.error("Try after some time")
        }
    }
}

export const updateUserAbout = (about, id) => {
    return async(dispatch) => {
        const {data, error} = await supabase.from("User").update({about: about}).eq("id", id);
        if(!error){ß
            const user = JSON.parse(localStorage.getItem("profile"))
            localStorage.setItem("profile", JSON.stringify({...user, about:about}));
            dispatch(updateAbout(about));
        }
        else{
            toast.error("Try after some time")
        }
    }
}

export const updateUserAvatar = (filePath, file, oldAvatarUrl, id) => {
    return async(dispatch) => {
        // const path = extractFilePathFromUrl(oldAvatarUrl, AvatarStorage.name)
        // console.log(path)
        // const deleted= await deleteFile(path);
        // console.log(deleted)
        // if(!deleted) return;

        const data = await uploadFile(filePath, file)
        if(data){
           
            const { data:uploaded, error } = await supabase
                .from('User')
                .update({ avatar: data }) // or a signed URL if needed
                .eq('id', id);
            
            if(!error){
                dispatch(updateAvatar(data))
                const setProfile = JSON.parse(localStorage.getItem("profile"))
                localStorage.setItem("profile", JSON.stringify({...setProfile,  avatar: data}))
            }

        }

    }
}
