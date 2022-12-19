import { ButtonHTMLAttributes, ReactNode } from "react";
import './style.scss'

type ButtonTypes = 'inverted' | 'primary'; 

const buttonTypesClasses = {
    inverted: 'inverted',
    primary: 'primary'
}

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    variant?: ButtonTypes
}   

const Button = ({children,variant, ...props}: Button) => {
  return    <button {...props} className={`button-container ${variant && buttonTypesClasses[variant]} ${props.className}`} >
                {children}
            </button>
}

export default Button
