import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChatIcon, SettingsIcon } from '../../icons'
import { setNavigation } from '../../../reducers/navigationSlice'

function NavigationPanel() {
    const profile = useSelector((state)=>state.profile)
    const selected = useSelector((state)=>state.navigation)
    const dispatch = useDispatch()
    const navigationHandler = (e, tab) => {
        e.preventDefault()
        dispatch(setNavigation(tab))
    }
  return (
    <div className = 'flex flex-col justify-between items-center !px-3 !py-8 h-full rounded-2xl bg-white/50 border-white/50 border'>
        {/* upper navigation panel */}
        <div className='flex flex-col gap-4 items-center justify-center'>

            <div className={`flex items-center justify-center w-full rounded-[10px] !px-2 ${selected.search && ('!py-3 bg-white/40')}`}
                onClick={(e)=>{navigationHandler(e,"search")}}>
                <ChatIcon/>
            </div>

            {/* other icons in future */}


        </div>

        {/* lower navigation panel */}
        <div className='flex flex-col gap-4 items-center justify-center'>

            <div className={`flex items-center justify-center w-full rounded-[10px] !px-2  ${selected.settings && ('!py-3 bg-white/40')}`}
                onClick={(e)=>{navigationHandler(e,"settings")}}>
                <SettingsIcon/>
            </div>

              <div className={`flex items-center justify-center w-full rounded-[10px] !px-2  ${selected.profile ? '!py-3 bg-white/40' : ''}`}
                  onClick={(e) => { navigationHandler(e, "profile") }}>
                      <img
                          src={profile.avatar}
                          className='border border-dark-blue rounded-full aspect-square w-9 object-cover'
                          alt='Profile image'
                          loading='lazy'
                      />
              </div>
        </div>
    </div>
  )
}

export default NavigationPanel