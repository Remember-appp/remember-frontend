type UserSettingsTypes = {
  user_id: string | null
  tz: string | null
  locale: string | null
  privacy: object[]
  notifications: object[]
}

type SettingsPayloadType = {
  tz?: string
  locale?: string
}
