import toast from "react-hot-toast";
import supabase from "./supabase"
import { imagePath } from "./constant";

export const uploadFile = async(filePath, file) => {
    const {data, error} = await supabase.storage.from("bento-chat").upload(filePath, file);
    if(error){
        toast.error("Try after some time")
        return null
    }
    else{
       return `${imagePath}${data.path}`
    }
}

export const deleteFile = async(filePath) => {
    const {data, error} = await supabase.storage.from("bento-chat").remove([filePath]);
    if(error){
        toast.error("Failed to uplaod the image")
        return false
    }
    else{
        return true
    }
}

export const getFileUrl = async(filePath) => {
    const {data, error} = supabase.storage
    .from("bento-chat")
    .getPublicUrl(filePath);

    if(data){
        return data?.publicUrl
    }
    return null;
}