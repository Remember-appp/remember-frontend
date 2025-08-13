import { HeaderTextProps } from "@/types/componentsTypes"

export const HeaderText: React.FC<HeaderTextProps> = ({ text = 'Page' }) => {
  return (
    <div className="w-full flex justify-center mt-5  animate-fade ">
      <h1 className="text-3xl font-black font-sans flex">{text}</h1>
    </div>
  )
}
