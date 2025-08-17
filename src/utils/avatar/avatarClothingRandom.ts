const cloth = [
  'blazerAndShirt',
  'blazerAndSweater',
  'collarAndSweater',
  'graphicShirt',
  'hoodie',
  'overall',
  'shirtCrewNeck',
  'shirtScoopNeck',
  'shirtVNeck',
]

export const avatarClothRandomizer = () => {
  const random = Math.floor(Math.random() * cloth.length)
  return cloth[random]
}

