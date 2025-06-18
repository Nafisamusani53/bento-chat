import React, { useState } from 'react'
import SearchBar from './SearchBar'
import List from './List'

function SearchContainer() {
  const [userList, setUserList] = useState([])

  return (
    <>
        <SearchBar setUserList={setUserList}/>
        <List userList={userList}/>
    </>
  )
}

export default SearchContainer