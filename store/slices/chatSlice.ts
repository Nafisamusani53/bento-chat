import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { blockUser } from "../thunks/ChatThunks";

interface ChatState {
    chatId : string | null;
    userId : string | null;
    userName : string | null;
    userAvatar : string | null;
    deleted ?: boolean | null;
    newChat : boolean | null;
    userEmail : string | null;
    userAbout : string | null;
    blocked : boolean | null;
}
const initialState : ChatState = {
    chatId: null,
    userId : null,
    userName: null,
    userAvatar: null,
    deleted : null,
    newChat: null,
    userEmail: null,
    userAbout: null,
    blocked: null
}

const chatReducer = createSlice({
    name: "chat",
    initialState,
    reducers:{
        setChat(state, action : PayloadAction<ChatState>){
            const data = action.payload
            state.chatId = data.chatId;
            state.userId = data.userId;
            state.userName = data.userName
            state.userAvatar = data.userAvatar
            state.deleted = data.deleted,
            state.newChat = data.newChat
            state.userAbout = data.userAbout,
            state.userEmail = data.userEmail,
            state.blocked = data.blocked
        },
        setNewChat(state, action){
            state.newChat = action.payload
        },
        clearChat(state){
            state.chatId = null;
            state.userId = null;
            state.userName = null;
            state.userAvatar = null;
            state.deleted = null;
            state.newChat = null;
            state.userAbout = null;
            state.userEmail = null;
        },
        userBlock(state, action){
            state.blocked = action.payload;
        }
    },
    extraReducers: (builder) => {
  builder.addCase(blockUser.fulfilled, (state, action) => {
    state.blocked = action.payload
  })
}
})

export const {setChat, setNewChat, clearChat, userBlock} = chatReducer.actions;

export default chatReducer.reducer;