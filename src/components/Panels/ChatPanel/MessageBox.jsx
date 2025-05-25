import React from 'react'
import { DeliveredIcon, ReadIcon, SendIcon } from '../../icons'

function MessageBox({ id, data }) {
    return (
        <div className={`flex flex-col ${id === data.from ? 'items-end' : 'items-start'} justify-center w-full`}>
            <div className={`!px-5 !py-3 rounded-2xl text-[16px] max-w-[444px] ${id === data.from ? 'msgShadow bg-sky-blue text-black rounded-br-none text-right' : 'bg-dark-blue text-white rounded-bl-none text-left'}`}>
                {data.message}
            </div>
            <div className={`flex flex-row gap-1.5 items-center ${id === data.from ? 'justify-end' : 'justify-start'}`}>
                <div className='text-grey text-[10px]'>{data.time}</div>
                {data.from === id && (
                    data.status === "delivered" ? (
                        <DeliveredIcon />
                    ) : data.status === "send" ? (
                        <SendIcon />
                    ) : (
                        <ReadIcon />
                    )
                )}

            </div>
        </div>
    )
}

export default MessageBox