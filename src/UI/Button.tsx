import { ButtonHTMLAttributes, FC, ReactNode } from 'react';



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            className='bg-[#202124] mt-[10px] py-[10px] px-[20px] hover:bg-slate-500 rounded-xl transition'
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;