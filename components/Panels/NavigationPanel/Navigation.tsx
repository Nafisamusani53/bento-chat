'use client'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { NavigationTab, setNavigation } from '@/store/slices/navigationSlice'
import React from 'react'
import { ChatIcon, SettingsIcon } from '../../icons'
import Image from 'next/image'

// have to solve avatar problem as of right now i have added a default value, i have to see to how it works after i
// initialize the value in useEffect in page.tsx
const Navigation = () => {
    const profile = useAppSelector((state) => state.profile)
    const activeTab = useAppSelector(
        (state) => state.navigation.activeTab
    )
    const dispatch = useAppDispatch()
    const navigationHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        tab: NavigationTab) => {
        e.preventDefault()
        dispatch(setNavigation(tab))
    }

    return (
        <div className='flex flex-col justify-between items-center !px-3 !py-8 h-full rounded-2xl bg-white/50 border-white/50 border'>
            {/* upper navigation panel */}
            <div className='flex flex-col gap-4 items-center justify-center'>

                <div className={`flex items-center justify-center w-full rounded-[10px] !px-2 cursor-pointer transition-all duration-300 ease-in-out
                                ${activeTab === "search" ? '!py-3 bg-white/40' : 'bg-transparent'}`}
                    onClick={(e) => { navigationHandler(e, "search") }}>
                    <ChatIcon />
                </div>

                {/* other icons in future */}


            </div>

            {/* lower navigation panel */}
            <div className='flex flex-col gap-4 items-center justify-center'>

                <div className={`flex items-center justify-center w-full rounded-[10px] !px-2 cursor-pointer transition-all duration-300 ease-in-out
                                ${activeTab === "settings" ? '!py-3 bg-white/40' : 'bg-transparent'}`}
                    onClick={(e) => { navigationHandler(e, "settings") }}>
                    <SettingsIcon />
                </div>

                <div className={`flex items-center justify-center w-full rounded-[10px] !px-2 cursor-pointer transition-all duration-300 ease-in-out
                                ${activeTab === "profile" ? '!py-3 bg-white/40' : ' bg-transparent'}`}
                    onClick={(e) => { navigationHandler(e, "profile") }}>
                    <img
  src={profile.avatar}
  className="border border-dark-blue rounded-full aspect-square w-9 object-cover"
  alt="Profile image"
/>
                </div>
            </div>
        </div>
    )
}

export default Navigation