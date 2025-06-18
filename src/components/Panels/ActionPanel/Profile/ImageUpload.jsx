import { useRef, useState } from 'react'
import { CameraIcon } from '../../../icons'
import { useDispatch } from 'react-redux'
import { updateUserAvatar } from '../../../../service/ProfileService'
import { AvatarStorage } from '../../../../utils/constant'
import toast from 'react-hot-toast'

function ImageUpload({ avatar, id }) {
    const [hover, setHover] = useState(false)
    const inputFile = useRef(null)
    const dispatch = useDispatch()

    const handleClick = () => {
        if (hover && inputFile.current) {
            inputFile.current.click()
        }
    }

    const handleFileUpload = async (e) => {
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
        dispatch(updateUserAvatar(filePath, file, avatar, id))
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


// need to remove old image from storage, if exist
