
import { InputHTMLAttributes, ReactNode } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode,
}

export const Input = ({ icon, className, ...props }: InputProps) => {
  return (
    <div {...props} className={className}>
      <input />
      <span> {icon}</span>
    </div>


  )
}