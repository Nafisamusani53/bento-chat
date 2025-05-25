import React from 'react'
import ListItems from './ListItems'

function List({userList}) {
  return (
    <div className='flex flex-col gap-2.5 justify-between w-full max-h-full'>
        {
            userList.map((items) => (
                <ListItems data={items} key={items.id} selected={5}/>
            ))
        }
    </div>
  )
}

export default List