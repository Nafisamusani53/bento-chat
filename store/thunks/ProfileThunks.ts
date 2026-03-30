
import { createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { uploadFile } from "@/utils/storageUtils"
import { supabase } from "@/utils/supabase/client"

interface UpdateUserNameArgs {
  name: string
  id: string
}

interface UpdateUserAboutArgs {
  about: string
  id: string
}

interface UpdateUserAvatarArgs {
  filePath: string
  file: File
  id: string
  avatar?: string
}

export const updateUserName = createAsyncThunk<
  string,                // return updated name
  UpdateUserNameArgs     // args
>(
  "profile/updateUserName",
  async ({ name, id }, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("User")
        .update({ username: name })
        .eq("id", id)

      if (error) {
        toast.error("Try after some time")
        return rejectWithValue(error.message)
      }

      toast.success("Name updated successfully")

      return name
    } catch (err) {
      toast.error("Try after some time")
      return rejectWithValue("Failed to update name")
    }
  }
)


export const updateUserAbout = createAsyncThunk<
  string,
  UpdateUserAboutArgs
>(
  "profile/updateUserAbout",
  async ({ about, id }, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("User")
        .update({ about })
        .eq("id", id)

      if (error) {
        toast.error("Try after some time")
        return rejectWithValue(error.message)
      }

      toast.success("About updated successfully")

      return about
    } catch (err) {
      toast.error("Try after some time")
      return rejectWithValue("Failed to update about")
    }
  }
)



export const updateUserAvatar = createAsyncThunk<
  string,                    // return avatar URL
  UpdateUserAvatarArgs
>(
  "profile/updateUserAvatar",
  async ({ filePath, file, avatar, id}, { dispatch, rejectWithValue }) => {
    try {

        // const path = extractFilePathFromUrl(oldAvatarUrl, AvatarStorage.name)
        // console.log(path)
        // const deleted= await deleteFile(path);
        // console.log(deleted)
        // if(!deleted) return;
      const uploadedUrl = await uploadFile(filePath, file)

      if (!uploadedUrl) {
        return rejectWithValue("Upload failed")
      }

      const { error } = await supabase
        .from("User")
        .update({ avatar: uploadedUrl })
        .eq("id", id)

      if (error) {
        toast.error("Failed to update avatar")
        return rejectWithValue(error.message)
      }

      toast.success("Avatar updated successfully")

      return uploadedUrl
    } catch (err) {
      toast.error("Try after some time")
      return rejectWithValue("Avatar update failed")
    }
  }
)
