import ListItems from './ListItems'

function List({userList}) {

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