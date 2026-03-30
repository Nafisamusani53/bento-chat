import { Emoji, LinkIcon } from '@/components/icons';
import useClickOutside from '@/hooks/clickOutside';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setNewChat } from '@/store/slices/chatSlice';
import { MessageInsert } from '@/type';
import { getFileUrl, uploadFile } from '@/utils/storageUtils';
import { supabase } from '@/utils/supabase/client';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, {useRef, useState } from 'react'

const InputBox = () => {
  const [msg, setMsg] = useState<string>("")
  const chat = useAppSelector(state => state.chat);
  const profileId = useAppSelector(state => state.profile.id)
  const presence = useAppSelector(state => state.trackUser.presence)
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  // const file = e.target.files[0];
  // if (!file) return;
    const files = e.target.files
  if (!files || files.length === 0) return

  if (!chat.chatId) return

  const file = files[0]

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `chat-media/${chat.chatId}/${fileName}`;

  const uploaded = await uploadFile(filePath, file)

  if (!uploadFile) {
    return;
  }

  const fileUrl = await getFileUrl(filePath);

  if (fileUrl) {
    await sendMessage(fileUrl);
  }
};


  useClickOutside(pickerRef, ()=>setShowPicker(false))

  const createChat = async () => {
    const { data, error } = await supabase.rpc('createchatuser', {
      chatid: chat.chatId,
      userid: chat.userId,
      profileid: profileId
    });
    if (!error) dispatch(setNewChat(false))
  }

  const sendMessage = async (fileUrl ?: string) => {
    

    if (!chat.chatId) return
    if (!profileId) return

    const finalMessage = fileUrl ?? msg.trim()

    if (!finalMessage) return

    setMsg("")

    if (chat.newChat) {
      await createChat()
    }

    const data : MessageInsert = {
      chat_id: chat.chatId,
      sender_id: profileId,
      message: finalMessage,
    }
    if(chat.userId && presence[chat.userId]){
      data.status = "read"
    }
    if(fileUrl){
      data.type = "file"
    }
    const { error } = await supabase.from('Message').insert(data);
  }

  const handleKeyChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage()
  }

  const onEmojiClick = (emojiData : EmojiClickData) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current
    if(!input) return;
    const cursorPos = input.selectionStart ?? msg.length;
    const newText = msg.slice(0, cursorPos) + emoji + msg.slice(cursorPos);
    setMsg(newText);

    // move cursor after emoji
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
    }, 0);

    setShowPicker(false);
  }

  return (
    <div className='relative flex justify-between items-center gap-6 !px-5 !py-3.5 rounded-b-2xl bg-white/30 border-t border-t-white/50 w-full'>
      {chat.deleted ? (<>
        <div className='text-2xl text-grey text-center w-full'>User does not exist</div>
      </>) : chat.blocked ? (<div className='text-2xl text-grey text-center w-full'>Unblock user to chat</div>) : (<>
      <div className='w-fit cursor-pointer relative'>
        <div onClick={() => setShowPicker(prev => !prev)}>
          <Emoji/>
        </div>
        {showPicker && (
          <div ref={pickerRef} className='absolute bottom-full mb-2 z-50'>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>

      {/* Input Box */}
      <input
        ref={inputRef}
        className='!px-4 !py-2 rounded-[10px] placeholder-grey text-black w-full bg-white/30'
        type='text'
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder='Type a message'
        onKeyDown={handleKeyChange}
      />

      {/* Attachment Icon */}
      <div className='w-fit cursor-pointer' onClick={handleFileClick}>
        <LinkIcon />
      </div>

      <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
            accept="image/jpeg,image/png,image/jpg,image/webp,video/mp4,video/webm" // customize as needed
          />
      </>)}
      
    </div>
  )
}

export default InputBox