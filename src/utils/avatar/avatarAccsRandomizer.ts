const accs = [
  'eyepatch',
  'kurt',
  'prescription01',
  'prescription02',
  'round',
  'sunglasses',
  'wayfarers',
]

export const avatarAccsRandomizer = () => {
  const random = Math.floor(Math.random() * accs.length)
  return accs[random]
}

