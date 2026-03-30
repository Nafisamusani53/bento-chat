'use client'

import { CameraIcon } from '@/components/icons'
import { useAppDispatch } from '@/store/hooks'
import { updateUserAvatar } from '@/store/thunks/ProfileThunks'
import { AvatarStorage } from '@/utils/constants'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface ImageUplaodArgs{
  avatar : string;
  id: string;
}

const ImageUpload : React.FC<ImageUplaodArgs> = ({avatar, id}) => {
  const [hover, setHover] = useState<boolean>(false)
    const inputFile = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const handleClick = () => {
        if (hover && inputFile.current) {
            inputFile.current.click()
        }
    }

    const handleFileUpload = async (e : React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }
        const file = e.target.files[0]
        if (!file) return
        if (file.size > AvatarStorage.size) {
            toast.error('File size should be less than 3MB.')
            return
        }

        if (!AvatarStorage.allowed.includes(file.type)) {
            toast.error('Only JPEG, JPG, PNG, and WEBP images are allowed.')
            return
        }
        const fileExt = file.name.split('.').pop()
        const filePath = `avatars/${Date.now()}.${fileExt}`
        dispatch(updateUserAvatar({filePath, file, avatar, id}))
    }

    return (
        <div
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='flex w-full items-center justify-center !py-6 relative group'
        >
            <img
                src={avatar}
                alt='Profile'
                className={`w-40 aspect-square rounded-full border border-white object-cover ${hover ? 'blur-xs' : ''}`}
                loading='lazy'
            />

            <input
                type='file'
                ref={inputFile}
                className='hidden'
                onChange={handleFileUpload}
                accept="image/jpeg,image/png,image/jpg,image/webp"
            />

            <div
                className={`absolute flex flex-col justify-center items-center cursor-pointer ${hover ? 'visible' : 'invisible'}`}
                onClick={handleClick}
            >
                <CameraIcon />
                <div className='text-white text-[10px] font-bold text-center'>Change Photo</div>
            </div>
        </div>
    )
}

export default ImageUpload

//need to remove old image from storage if exist