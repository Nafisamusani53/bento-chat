import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import supabase from '../../../../utils/supabase'
import { useSelector } from 'react-redux';

function ListItems({data, selected}) {
  const profileId = useSelector(state => state.profile.id)
  const createChat = async() => {
    const chatId = uuidv4()
    await supabase.from("Chat").insert([
      {
        id: chatId,
        created_by: profileId
      }
    ])

    await supabase.from("ChatUser").insert([
      {
        chat_id: chatId,
        user_id: profileId
      }
    ])
  }
  return (
    <div className={`w-full cursor-pointer flex justify-between items-center gap-2.5 !px-2 !py-2.5 ${selected === data.id && "bg-white/40 rounded-[10px]"}`}
      onClick={createChat}

    >
        <img src={data?.avatar} className='rounded-full aspect-square w-11 bg-none'/>
        
        <div className='flex flex-col w-full'>
        <p className='text-black text-[16px]'>{data?.userName}</p>
        <p className='text-black text-xs'>{data?.lastMsg}</p>
        </div>

        <div className='text-grey text-[10px] align-top h-full'>{data?.msgTime}</div>

    </div>
  )
}

export default ListItems