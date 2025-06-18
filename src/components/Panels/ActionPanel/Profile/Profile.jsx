import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CameraIcon, EditIcon } from '../../../icons'
import ImageUpload from './ImageUpload'
import ProfileInput from './ProfileInput'
import { updateUserAbout, updateUserName } from '../../../../service/ProfileService'

function Profile() {
    const profile = useSelector(state => state.profile)
    const [about, setAbout] = useState(profile.about)

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