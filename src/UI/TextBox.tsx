import * as LabelBase from "@radix-ui/react-label";
import clsx from "clsx";
import { forwardRef, InputHTMLAttributes } from "react";



interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    noLabel?: boolean;
    error?: boolean;
    description?: string;

}

const TextBox = forwardRef<HTMLDivElement, Props>(
    (
        {
            label,
            noLabel,
            error,
            description,
            className,
            ...props
        }: Props,
        ref,
    ) => {
        return <div ref={ref} className={clsx("flex relative flex-col gap-1",)}>
            <div className="relative flex">
                <input
                    type="text"
                    placeholder=" "
                    className={clsx(
                        "w-full rounded-lg border appearance-none font-black border-gray-2 pt-3 px-3 text-sm outline-none peer disabled:bg-gray-1 disabled:text-gray-3",
                        error && "border-system-red",
                        className,
                    )}

                    {...props}
                />

                {!noLabel && (
                    <LabelBase.Root className={`absolute select-none text-xs text-gray-4 duration-300 transform -translate-y-3 top-4 z-10 origin-[0] left-3 peer-placeholder-shown:text-sm peer-placeholder-shown:-translate-y-1 peer-focus:text-xs peer-focus:-translate-y-3`}>
                        {label}
                    </LabelBase.Root>
                )}
            </div>
            {error && description ? (
                <LabelBase.Root
                    className={clsx("block text-xs", error ? "text-system-red" : "text-gray-4")}
                >
                    {description}
                </LabelBase.Root>
            ) : null}
        </div>
    },
);

TextBox.displayName = "TextBox";

export default TextBox;
