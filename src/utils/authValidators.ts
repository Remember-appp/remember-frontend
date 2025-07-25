
type ValidationResult = string | null

export const validateAuthName = (value: string): ValidationResult => {
  if (!value) return 'Name is required'
  if (value.length < 4) return 'Name must be at least 4 characters'
  if (value.length > 20) return 'Name must be at most 20 characters'
  if (!/^[\p{L}0-9_-]+$/u.test(value)) {
    return 'Name can contain only letters (any language), numbers, "-", and "_"'
  }
  return null
}

export const validateAuthEmail = (value: string): ValidationResult => {
  if (!value) return 'Email is required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return 'Invalid email address'

  return null
}

export const validateAuthPassword = (value: string): ValidationResult => {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (!/\d/.test(value)) return 'Password must contain at least one number'
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return 'Password can only contain letters, numbers, dashes (-), and underscores (_)'
  }
  if (/\s/.test(value)) return 'Password cannot contain spaces'
  return null
}

export const validateAuthConfirmPassword = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) return 'Please confirm your password'
  if (password !== confirmPassword) return 'Passwords do not match'
  return null
}