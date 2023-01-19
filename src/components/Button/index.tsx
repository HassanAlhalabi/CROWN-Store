import { ButtonHTMLAttributes, ReactNode } from "react";
import { BaseButton, InvertedButton, PrimaryButton } from "./styles";

type ButtonTypes = 'base' | 'inverted' | 'primary'; 

const buttonTypesClasses = {
    base: 'base',
    inverted: 'inverted',
    primary: 'primary'
}

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    variant?: ButtonTypes
}   

const getButton = (btnType = buttonTypesClasses.base) => {
    return {
        [buttonTypesClasses.base] : BaseButton,
        [buttonTypesClasses.primary]: PrimaryButton,
        [buttonTypesClasses.inverted] : InvertedButton
    }[btnType]
}

const Button = ({children,variant, ...props}: Button) => {
    const CustomButton = getButton(variant);
    return  <CustomButton {...props}>
                {children}
            </CustomButton>    
}

export default Button
