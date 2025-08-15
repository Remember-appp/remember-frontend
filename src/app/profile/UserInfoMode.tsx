import { UserPen } from 'lucide-react';
import Button from '@/components/Button'
import P from '@/components/P'
import { UserInfoModeProps } from '@/types/profileTypes';

export const UserInfoMode: React.FC<UserInfoModeProps> = ({
  name,
  email,
  onEdit,
}) => {
  return (
    <div className='animate-fade animate-duration-400'>
      <P
        label="Name :"
        text={name || 'Loading...'}
        classNameLabel="text-emerald-600"
      />
      <P
        label="Email : "
        text={email || 'Loading...'}
        classNameLabel="text-emerald-600"
      />
      <div className=" flex justify-start w-full gap-2">
        <Button
          onClick={onEdit}
          className=" text-sm font-semibold rounded-lg transition duration-200 bg-stone-300 hover:bg-stone-400 text-black flex items-center gap-1.5 mt-5 mr-3"
        >
          <UserPen size={17}/>
          <span>Edit</span>
        </Button>
      </div>
    </div>
  )
}
