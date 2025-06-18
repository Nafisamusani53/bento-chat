import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { convertDate } from '../../../../utils/helpers';
import { setChat } from '../../../../reducers/ChatSlice';
import defaultImage from '../../../../assets/images/default-image.webp';


function ListItems({data}) {
  const {chatId, blocked} = useSelector(state=>state.chat)
  const dispatch = useDispatch()
  const createChat = async() => {
    const newChat = data?.chat_id ? false : true
    const chatId = data?.chat_id ? data.chat_id :uuidv4()
    dispatch(setChat({
      chatId: chatId,
      userId: data.user_id,
      userName: data?.username,
      userAvatar: data?.avatar,
      userEmail: data?.email,
      userAbout: data?.about,
      deleted: data?.deleted, 
      blocked: data?.blocked,
      newChat: newChat
    }))
  }
  return (
    <div className={`w-full cursor-pointer flex justify-between items-center gap-2.5 !px-2 !py-2.5 ${data.chat_id !== null && chatId === data.chat_id && "bg-white/40 rounded-[10px]"}`}
      onClick={createChat}

    >
        <img src={data?.avatar && (!data.blocked || (data.chat_id === chatId && !blocked)) ? data?.avatar : defaultImage} className='rounded-full aspect-square w-11 bg-none object-cover'/>
        
        <div className='flex flex-col justify-between w-full gap-1'>
          <div className='flex w-full justify-between items-center'>
        <p className='text-black text-[14px]'>{data?.username ?? "Deleted User"}</p>
         {data?.unread_count ? <div className='w-[18px] aspect-square rounded-full bg-sky-blue text-white text-[10px] font-bold flex items-center justify-center'>{data?.unread_count}</div> : null}
        
        </div>
        <div className='flex justify-between w-full'>
          <p className='text-dark-grey text-xs'>
            {data.msgtype === "file" ? (<>📎 Attachment</>) : (data?.last_message?.length > 15
              ? data.last_message.slice(0, 15) + '...'
              : data?.last_message)}
            
          </p>
          {data?.last_message_time ?<div className='text-grey text-[10px] align-top h-full'>{convertDate(data?.last_message_time)}</div> : null}
        
        </div>
        </div>
        

    </div>
  )
}

export default ListItems