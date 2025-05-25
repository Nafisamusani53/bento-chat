import React, { Profiler } from 'react'
import SearchContainer from './Search/SearchContainer'
import { useSelector } from 'react-redux'

function ActionPanel() {
    const selected = useSelector(state => state.navigation)
  return (
    <div className='flex flex-col items-center rounded-2xl border-white/50 border bg-white/50 gap-6 !px-5 !py-9 h-full w-[368px]'>
        {selected.search ? (<SearchContainer/>) : null}
        {selected.settings ? (<></>) : null}
        {selected.profile ? (<></>) : null}
    </div>
  )
}

export default ActionPanel