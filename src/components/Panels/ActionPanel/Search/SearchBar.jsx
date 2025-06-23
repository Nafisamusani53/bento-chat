import React, { useEffect, useMemo, useRef, useState } from 'react'
import { CloseIcon, Search} from '../../../icons'
import debounce from 'lodash.debounce';
import supabase from "../../../../utils/supabase"
import { useSelector } from 'react-redux';


function SearchBar({setUserList}) {
    const [value, setValue] = useState('')
    const id = useSelector(state => state.profile.id)

    const chatUsers = async() =>{
      if(!id){
        return;
      }
      const {data, error} = await supabase.rpc("chatlist", {
        profileid: id
      })
      if(data){
        setUserList(data)
      }
    }

  const sendRequest = async () => {
    if(value){
      const {data: users, error} = await supabase.rpc("search", {
        profileid: id,
        content : value
      })
      if(users){
        setUserList(users)
      }
    }

  };

  useEffect(()=>{
    chatUsers()
  },[id])

  // creating ref and initializing it with the sendRequest function
  const ref = useRef(sendRequest);

  useEffect(() => {
    // updating ref when state changes
    // now, ref.current will have the latest sendRequest with access to the latest state
    ref.current = sendRequest;
  }, [value]);

  // creating debounced callback only once - on mount
  const debouncedCallback = useMemo(() => {
    // func will be created only once - on mount
    const func = () => {
      // ref is mutable! ref.current is a reference to the latest sendRequest
      ref.current?.();
    };
    // debounce the func that was created once, but has access to the latest sendRequest
    return debounce(func, 500);
    // no dependencies! never gets updated
  }, []);

  const inputHandler = (e) => {
    const value = e.target.value;

    // calling the debounced function
    setValue(value)
    debouncedCallback();
  };
  return (
    <div className='w-full flex justify-between items-center !px-4 !py-2 bg-white/30 rounded-[10px]'>
        <input type='text'
            value={value}
            placeholder='Search'
            onChange={inputHandler}
            id={"search"}
            name='search'
            className='placeholder-bg-grey bg-none focus:outline-none'
        />
        {/* {value ? (<div className='cursor-pointer' onClick={()=>{
          setValue("")
          chatUsers()
          }}>
          <CloseIcon/>
        </div>) : (<SearchIcon/>)} */}

          <div className="w-5 h-5 flex items-center justify-center cursor-pointer">
    {value ? (
      <div onClick={() => {
        setValue("");
        chatUsers();
      }}>
        <CloseIcon />
      </div>
    ) : (
      <Search/>
    )}
  </div>

        
    </div>
  )
}

export default SearchBar