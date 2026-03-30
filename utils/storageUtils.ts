import toast from "react-hot-toast";
import { imagePath } from "./constants";
import { supabase } from "./supabase/client";

export const uploadFile = async(filePath:string, file: File)  : Promise<string | null>=> {
    const {data, error} = await supabase.storage.from("bento-chat").upload(filePath, file);
    if(error){
        toast.error("Try after some time")
        return null
    }
    else{
       return `${imagePath}${data.path}`
    }
}

export const deleteFile = async(filePath : string) : Promise<boolean> => {
    const {data, error} = await supabase.storage.from("bento-chat").remove([filePath]);
    if(error){
        toast.error("Failed to uplaod the image")
        return false
    }
    else{
        return true
    }
}

export const getFileUrl = async(filePath : string) : Promise<string | null> => {
    const {data} = supabase.storage
    .from("bento-chat")
    .getPublicUrl(filePath);

    if(data){
        return data?.publicUrl
    }
    return null;
}