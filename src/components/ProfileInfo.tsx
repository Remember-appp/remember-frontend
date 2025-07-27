import { ProfileInfoProps } from "@/types/componentsTypes"

const ProfileInfo = ({ children }: ProfileInfoProps) => {
  return (
    <div className="w-full p-4 bg-stone-100 rounded-xl"> 
      <div className="flex flex-col sm:justify-center gap-2"> 
        {children}
      </div>
    </div>
  )
}

export default ProfileInfo
