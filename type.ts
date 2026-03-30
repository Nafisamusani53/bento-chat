export interface UserList {
    about : string;
    avatar : string;
    blocked: boolean;
    chat_id: string;
    email : string;
    last_message: string;
    last_message_time: string;
    msgtype: string | null;
    unread_count : number;
    user_id: string;
    username: string;
    deleted ?: boolean;

}
export interface Messages{
    chat_id : string;
    created_at: string;
    id: string;
    message: string;
    sender_id: string;
    status : string;
    type: string | null;
    updated_at: string;
}
// chat_id
// : 
// "ce132727-22c9-4347-91ec-704fe322b9bc"
// created_at
// : 
// "2025-06-18T16:11:50.228518+00:00"
// id
// : 
// "210c9f33-995c-4e91-b6b9-ab13ba12df4d"
// message
// : 
// "Hello"
// sender_id
// : 
// "d952f867-a60f-409c-be6a-1f9a6b10a3f9"
// status
// : 
// "read"
// type
// : 
// null
// updated_at
// : 
// "2025-06-18T16:11:50.228518+00:00"

export interface PresenceMeta {
  user_id: string
  presence_ref : string;
}

export type PresenceState = Record<string, PresenceMeta[]>

export interface MessageInsert {
  chat_id: string
  sender_id: string
  message: string
  status?: 'read' | 'sent'
  type?: 'text' | 'file'
}

export interface DeleteAccountArgs {
  userId: string
  token: string
}

export type LoadingState = "idle" | "loading" | "succeeded" | "failed"
export interface ProfileState {
  id: string;
  username: string;
  email: string;
  avatar: string;
  about: string;
  status: LoadingState
}
