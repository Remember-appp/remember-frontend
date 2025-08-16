const avatarColors = ['b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf']

export const avatarColorRandomizer = () => {
  const random = Math.floor(Math.random() * avatarColors.length)
  return avatarColors[random]
}
