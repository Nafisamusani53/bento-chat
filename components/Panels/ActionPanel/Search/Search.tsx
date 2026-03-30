'use client'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import List from './List'
import { UserList } from '@/type'

const Search = () => {
  const [userList, setUserList] = useState<UserList[]>([]) // need to define the type

  return (
    <>
        <SearchBar setUserList={setUserList}/>
        <List userList={userList}/>
    </>
  )
}

export default Search