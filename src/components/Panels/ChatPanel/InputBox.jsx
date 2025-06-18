import { useEffect, useRef, useState } from 'react'
import { Emoji, LinkIcon } from '../../icons'
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../../../utils/supabase';
import EmojiPicker from 'emoji-picker-react';
import useClickOutside from '../../../hooks/clickOutside';
import { setNewChat } from '../../../reducers/ChatSlice';
import { getFileUrl, uploadFile } from '../../../utils/storageUtils';

function InputBox() {
  const [msg, setMsg] = useState("")
  const chat = useSelector(state => state.chat);
  const profileId = useSelector(state => state.profile.id)
  const presence = useSelector(state => state.trackUser.presence)
  const [showPicker, setShowPicker] = useState(false)
  const dispatch = useDispatch()

  const inputRef = useRef(null)
  const pickerRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileClick = () => {
    fileInputRef.current?.click();
  }

  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `chat-media/${chat.chatId}/${fileName}`;

  const { data, error: uploadError } = await uploadFile(filePath, file)

  if (uploadError) {
    console.error('Upload failed:', uploadError);
    return;
  }

  // Get public URL or signed URL
  // const { data: publicUrlData } = await uploadFile(filePath, file)
  // const { data: publicUrlData } = supabase.storage
  //   .from('your-bucket-name')
  //   .getPublicUrl(filePath);
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

  const sendMessage = async (fileUrl) => {
    setMsg("")
    if ((!fileUrl && !chat.chatId) && (!msg.trim() && !chat.chatId) ) {
      return
    };

    if (chat.newChat) {
      await createChat()
    }

    const data = {
      chat_id: chat.chatId,
      sender_id: profileId,
      message: msg.trim() || fileUrl,
    }
    if(presence[chat.userId]){
      data.status = "delivered"
    }
    if(fileUrl){
      data.type = "file"
    }
    const { error } = await supabase.from('Message').insert(data);
    console.log(error)
  }

  const handleKeyChange = (e) => {
    if (e.key === "Enter") sendMessage()
  }

  const onEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji;
    const cursorPos = inputRef.current.selectionStart;
    const newText = msg.slice(0, cursorPos) + emoji + msg.slice(cursorPos);
    setMsg(newText);

    // move cursor after emoji
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
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
          <Emoji />
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
