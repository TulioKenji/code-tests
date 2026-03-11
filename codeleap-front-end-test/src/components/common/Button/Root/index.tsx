'use client';

interface ButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function ButtonRoot({ children, className, ...props }: ButtonRootProps) {
    return (
        <button
            {...props}
            className={'text-[16px] font-bold disabled:bg-disabled disabled:text-black cursor-pointer rounded-lg border border-button-border transition-all duration-500 active:scale-95' + ' ' + className}
        >
            {children}
        </button>
    );
}