export const imagePath = process.env.NEXT_PUBLIC_IMAGE_PATH!
export const supbaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

export const localStorageName = {
    profile: "profile",
}

export const AvatarStorage = {
    name: "bento-chat",
    size : 3 * 1024 * 1024,
    allowed: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
}

export const apis = {
    deleteAccount : `${supbaseUrl}/functions/v1/delete-user-and-update-chat`,
}