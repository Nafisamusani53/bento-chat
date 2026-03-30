

import { supabase } from "@/utils/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

interface DeleteChatArgs {
  chatId: string | null;
  userId: string;
}

interface BlockUserArgs {
  chatId: string;
  userId: string;
  blocked: boolean;
}



export const deleteUserChat = createAsyncThunk<
  void,
  DeleteChatArgs
>("chat/deleteUserChat", async ({ chatId, userId }, { rejectWithValue }) => {
  const { error } = await supabase.rpc("delete_chat", {
    chatid: chatId,
    userid: userId,
  })

  if (error) {
    toast.error("Unable to delete the chat")
    return rejectWithValue(error.message)
  }
//   need to close the modal
})

export const blockUser = createAsyncThunk<
  boolean,
  BlockUserArgs
>("chat/blockUser", async ({ chatId, userId, blocked }, { rejectWithValue }) => {
  const { error } = await supabase
    .from("ChatUser")
    .update({ blocked })
    .eq("chat_id", chatId)
    .eq("user_id", userId)

  if (error) {
    toast.error("Unable to update block status")
    return rejectWithValue(error.message)
  }

  return blocked
//   need to close the modal
})
