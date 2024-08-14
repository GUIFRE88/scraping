export interface ModalInterface {
  isOpen: boolean
  onClose: () => void
  profileId?: number
  action: string
  refreshProfiles: () => void
}