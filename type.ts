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

export interface LoginError {
  email: boolean;
  password: boolean;
}

export interface SignupError {
    username: boolean;
    password: boolean;
    email: boolean;
}

export interface RePassError{
    password : boolean;
    confirmPass: boolean;
}