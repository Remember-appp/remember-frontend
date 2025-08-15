import { ProfileCardProps } from "@/types/componentsTypes"

const ProfileCard = ({ children }: ProfileCardProps) => {
  return (
    <div className="flex justify-center min-h-screen animate-fade-up p-4">
      <div className="w-full max-w-5xl">
        <div className="w-full mx-auto mt-5 bg-[#f9fefb] shadow-[0_0px_20px_rgba(0,0,0,0.2)] rounded-xl p-6">
          <div className="w-full h-full">
            <div className="flex flex-col md:flex-row gap-4">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
