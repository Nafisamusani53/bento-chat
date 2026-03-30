'use client'

import { DeliveredIcon, ReadIcon } from '@/components/icons'
import { useAppSelector } from '@/store/hooks'
import { Messages } from '@/type'
import { convertDate } from '@/utils/helper'
import React from 'react'
import FilePreview from './FilePreview'

interface MessageBocProps {
    data : Messages
}

const MessageBox : React.FC<MessageBocProps> = ({data}) => {
  const profileId = useAppSelector(state => state.profile.id) 
    return (
        <div className={`flex flex-col ${profileId === data.sender_id ? 'items-end' : 'items-start'} justify-center w-full`}>
            <div className={`!px-5 !py-3 rounded-2xl text-[16px] max-w-[444px] ${profileId === data.sender_id ? 'msgShadow bg-sky-blue text-black rounded-br-none ' : 'bg-dark-blue text-white rounded-bl-none'}`}>
                {/* {data.message} */}
                {data.type === 'file' ? (
  <FilePreview url={data.message} />
) : (
 data.message
)}
            </div>
            <div className={`flex flex-row gap-1.5 items-center ${profileId === data.sender_id ? 'justify-end' : 'justify-start'}`}>
                <div className='text-grey text-[10px]'>{convertDate(data.created_at)}</div>
                {profileId === data.sender_id && (
                    data.status === "delivered" ? (
                        <DeliveredIcon />
                    ) : data.status === "read" && (
                        <ReadIcon />
                    )
                )}

            </div>
        </div>
    )
}

export default MessageBox