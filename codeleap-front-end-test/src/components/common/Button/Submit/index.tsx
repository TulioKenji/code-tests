'use client';

import ButtonRoot, { ButtonRootProps } from "../Root";

interface ButtonSubmitProps extends ButtonRootProps {

}

export default function ButtonSubmit({ children, className, ...props }: ButtonSubmitProps) {
    return (
        <ButtonRoot type="submit" 
            className={'self-end h-8 w-30 text-center' + (' ' + className || '')}
            {...props}
        >
            {children}
            </ButtonRoot>
    );
}