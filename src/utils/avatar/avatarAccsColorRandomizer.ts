const accsColor = [
  '3c4f5c',
  '65c9ff',
  '262e33',
  '5199e4',
  '25557c',
  '929598',
  'a7ffc4',
  'b1e2ff',
  'e6e6e6',
  'ff5c5c',
  'ff488e',
  'ffafb9',
  'ffdeb5',
  'ffffb1',
  'ffffff',
]

export const avatarAccsColorRandomizer = () => {
  const random = Math.floor(Math.random() * accsColor.length)
  return accsColor[random]
}

