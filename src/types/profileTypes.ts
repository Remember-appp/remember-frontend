export type ProfileEditingModeIsTouched = {
  nameIsToched: boolean
  bioIsTouched: boolean
  birthIsTouched: boolean
  favoritePhrasesIsTouched: boolean
}

export type EditingModeProps = {
  placeholderName?: string
  placeholderEmail?: string
  onCancel: () => void
}

export type UserInfoModeProps = {
  name: string | null
  email: string | null
  bio: string | null
  birth: string | null
  phrases: object[] | string | null
  onEdit: () => void
}

export type EditingModePayload = {
  display_name?: string | null
}