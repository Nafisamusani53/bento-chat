'use client'

import { UserList } from '@/type'
import React from 'react'
import ListItems from './ListItems';

interface ListProps {
  userList: UserList[];
}

const List : React.FC<ListProps> = ({userList}) => {
    console.log("use list", userList)
  return (
   <div className='flex flex-col gap-1 w-full max-h-full overflow-y-scroll'>
        {
            userList.map((items) => (
                <ListItems data={items} key={items.user_id}/>
            )) 
        }
    </div>
  )
}

export default List