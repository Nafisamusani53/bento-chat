import React from 'react'
import MessageBox from './MessageBox'

function ChatScreen() {
    console.log("chatscreen")
    const chatList = [
        {
            from: 5,
            message: "Oyy",
            time: "10:00 pm",
            status: "read",
            to: 1,
            id: 1,
        },
        {
            from: 5,
            message: "Lets make a tech that will make us able to travel time",
            time: "10:00 pm",
            status: "read",
            to: 1,
            id: 2,
        },
        {
            from: 1,
            message: "WOWWWWWWWWWWWW",
            time: "10:00 pm",
            status: "read",
            to: 5,
            id: 3,
        },
        {
            from: 5,
            message: "I have done half of the research, but will take time, join MEEEE",
            time: "10:00 pm",
            status: "read",
            to: 1,
            id: 4,
        },
        {
            from: 1,
            message: "OFFCOURSE, I'AM INNNNNNNNN",
            time: "10:00 pm",
            status: "read",
            to: 5,
            id: 5,
        },
        {
            from: 5,
            message: "This is exhilarating :)))",
            time: "10:00 pm",
            status: "delivered",
            to: 1,
            id: 6,
        },{
            from: 1,
            message: "Yessss",
            time: "10:00 pm",
            status: "send",
            to: 5,
            id: 7,
        },
    ]
  return (
    <div className='flex flex-col !p-8 !pb-0 w-full h-full'>
        <div className='flex flex-col gap-1.5 w-full h-full'>
            {
                chatList.map((item)=>(
                    <MessageBox id={1} data={item} key={item.id}/>
                ))
            }
        </div>
    </div>
  )
}

export default ChatScreen