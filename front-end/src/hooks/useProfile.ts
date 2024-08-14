import { useState, useEffect } from 'react'
import { fetchProfile, updateProfile } from '../services/profileService'
import { ProfileInterface } from '../types/profile.interface'

export const useProfile = (profileId?: number) => {
  const [profile, setProfile] = useState<ProfileInterface | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profileId !== undefined) {
      fetchProfile(profileId)
        .then(data => {
          setProfile(data)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [profileId])

  const handleUpdateProfile = async (profileData: Partial<ProfileInterface>) => {
    if (profileId !== undefined) {
      await updateProfile(profileId, profileData)
    }
  }

  return { profile, loading, handleUpdateProfile }
}
