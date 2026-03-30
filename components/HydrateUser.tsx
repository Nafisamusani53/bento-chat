'use client'

import { useAppDispatch } from "@/store/hooks"
import { deleteProfile, setProfile } from "@/store/slices/profileSlice"
import { ProfileState } from "@/type"
import { useEffect } from "react"

interface HydrateUserArgs {
    profile : ProfileState
    children : React.ReactNode
}

export default function HydrateUser({ profile, children } : HydrateUserArgs) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (profile) {
      dispatch(setProfile(profile))
    } else {
      dispatch(deleteProfile())
    }
  }, [profile, dispatch])

  return children
}
