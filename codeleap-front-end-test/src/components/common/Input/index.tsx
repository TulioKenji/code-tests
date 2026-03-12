'use client';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // You can add custom props here if needed
}

export default function Input({ className, ...props }: InputProps) {
    return (
        <input
            {...props} 
            className={'w-full rounded-lg border border-input-border placeholder:text-text-input py-2 px-3 focus:outline-input-border'+ (' ' + className || '')}
        />
    )
}