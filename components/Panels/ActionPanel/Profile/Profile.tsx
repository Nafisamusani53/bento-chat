'use client'

import { useAppSelector } from '@/store/hooks'
import React from 'react'
import ImageUpload from './ImageUpload'
import ProfileInput from './ProfileInput'
import { updateUserAbout, updateUserName } from '@/store/thunks/ProfileThunks'

const Profile = () => {
  const profile = useAppSelector(state => state.profile)
    // const [about, setAbout] = useState(profile.about)

  return (
    <>
        <div className='w-full text-2xl font-bold text-black text-left'>
            Profile
        </div>

        <div className='flex flex-col items-start gap-4 h-full w-full'>
            {/* profile image */}
            <ImageUpload avatar={profile.avatar} id={profile.id}/>

            {/* Name */}
            <ProfileInput text={"Your Name"} defaultVal = {profile.username} id={profile.id} update={updateUserName}/>

            {/* About */}
            <ProfileInput text={"About"} defaultVal = {profile.about} id={profile.id} update={updateUserAbout}/>
        </div>
    </>
  )
}

export default Profile