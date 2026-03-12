
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {

}

export default function Label({ htmlFor, children, className, ...props }: { htmlFor: string; children: React.ReactNode } & LabelProps) {
    return (
        <label 
        htmlFor={htmlFor} 
        {...props} 
        className={'text-[16px] font-normal text-black' + (' ' + className || '')}
        >
            {children}
        </label>
    );
}