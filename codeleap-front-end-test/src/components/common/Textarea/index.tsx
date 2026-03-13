'use client';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}

export default function Textarea({className, ...props}: TextareaProps) {
    return (
        <textarea
            {...props} 
            className={'w-full rounded-lg border border-input-border placeholder:text-text-input py-2 px-3 focus:outline-input-border'+ (' ' + className || '')}
        />
    );
}