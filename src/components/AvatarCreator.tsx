import { avatarAccsColorRandomizer } from '@/utils/avatar/avatarAccsColorRandomizer'
import { avatarAccsRandomizer } from '@/utils/avatar/avatarAccsRandomizer'
import { avatarClothColorRandomizer } from '@/utils/avatar/avatarClothingColorRandom'
import { avatarClothRandomizer } from '@/utils/avatar/avatarClothingRandom'
import { avatarColorRandomizer } from '@/utils/avatar/avatarColorRandomizer'
import { random } from '@/utils/random'
import { useEffect, useState } from 'react'
import Button from './Button'

type AvatarCreatorProps = {
  name: string | number | null
}

export const AvatarCreator: React.FC<AvatarCreatorProps> = ({ name }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [seed, setSeed] = useState(name)

  const url = `https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}&backgroundColor=${avatarColorRandomizer()}&accessories=${avatarAccsRandomizer()}&accessoriesColor=${avatarAccsColorRandomizer()}&clothing=${avatarClothRandomizer()}&clothesColor=${avatarClothColorRandomizer()}`

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const regenerate = () => {
    setSeed(random(10000))
  }

  return (
    <div className="flex flex-col">
      {isMounted && (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={250}
            height={250}
            src={url}
            alt="Not found"
            className="rounded"
          />
          <Button
            onClick={regenerate}
            text="Get new"
            className='bg-emerald-300'
          />
        </div>
      )}
    </div>
  )
}
