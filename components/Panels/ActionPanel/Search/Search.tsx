'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import List from './List'
import { UserList } from '@/type'

const Search = () => {
  const [userList, setUserList] = useState<UserList[]>([]) // need to define the type
  const [loading, setLodaing] = useState<boolean>(false);

  return (
    <>
      <SearchBar setUserList={setUserList} setLoading={setLodaing} />
      {loading ?
        (
          <div className='action-panel-loader'></div>
        ) :
        (
          <List userList={userList} />
        )
      }

    </>
  )
}

export default Search