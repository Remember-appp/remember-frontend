export type ProfileEditingModeIsTouched = {
  nameIsToched: boolean
  emailIsTouched: boolean
}

export type EditingModeProps = {
  placeholderName?: string
  placeholderEmail?: string
  onCancel: () => void
}

export type UserInfoModeProps = {
  name: string | null
  email: string | null
  onEdit: () => void
}