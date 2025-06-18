import toast from "react-hot-toast"
import supabase from "../utils/supabase"
import { userBlock } from "../reducers/ChatSlice"

export const deleteUserChat = async(chatId, userId, setOpen) => {
    const {error} = await supabase.rpc("delete_chat", {
        chatid: chatId,
        userid: userId
      })

      if(error){
        toast.error("Unable to delete the chat")
        return;
      }
      setOpen(false)
}

export const blockUser =  (chatId, userId, setOpen, data) => {
  return async(dispatch) => {
  const{error} = await supabase.from("ChatUser").update({blocked : data}).eq("chat_id", chatId)
  .eq("user_id", userId);

  if(!error){
    setOpen(false);
    dispatch(userBlock(data))
  }
}
}