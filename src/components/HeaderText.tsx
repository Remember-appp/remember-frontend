import { HeaderTextProps } from "@/types/componentsTypes"

export const HeaderText: React.FC<HeaderTextProps> = ({ text = 'Page' }) => {
  return (
    <div className="w-full flex justify-center mt-5 ">
      <h1 className="text-3xl font-black font-sans">{text}</h1>
    </div>
  )
}
