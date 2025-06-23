import toast from "react-hot-toast"
import supabase from "../utils/supabase"
import { userBlock } from "../reducers/ChatSlice"

export const deleteUserChat = async(chatId, userId, handleClose) => {
    const {error} = await supabase.rpc("delete_chat", {
        chatid: chatId,
        userid: userId
      })

      if(error){
        toast.error("Unable to delete the chat")
        return;
      }
      handleClose()
}

export const blockUser =  (chatId, userId, handleClose, data) => {
  return async(dispatch) => {
  const{error} = await supabase.from("ChatUser").update({blocked : data}).eq("chat_id", chatId)
  .eq("user_id", userId);

  if(!error){
    handleClose()
    dispatch(userBlock(data))
  }
}
}