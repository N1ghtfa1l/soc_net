import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface SelectProps {
    setCardColor?: (value: string) => void;
    setAppColor?: (value: string) => void;
    colorFor?: "cardColor" | "appColor"
}

const cardColor = {
    'стандартный': "text-black bg-[#f0efef] border-black",
    'черно-белый': "text-white bg-black border-white",
    'фиолетово-голубой': "text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    'зелено-голубой': "bg-gradient-to-r from-cyan-500 to-blue-500",
    'зелено-синий': 'bg-gradient-to-r from-emerald-400 to-cyan-400',
    'темнота': 'bg-gradient-to-r from-slate-900 to-slate-700'
}

const appColor = {
    'стандартный': 'bg-[#202124]',
    'зелено-голубой': "bg-gradient-to-r from-cyan-500 to-blue-500",
    'зелено-синий': 'bg-gradient-to-r from-emerald-400 to-cyan-400',
    'фиолетово-голубой': "text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500",
    'темнота': 'bg-gradient-to-r from-slate-900 to-slate-700'
}


const SelectDemo: FC<SelectProps> = ({ setCardColor, colorFor, setAppColor }) => {
    const setColor = (value: string) => {
        if (colorFor === "cardColor" && setCardColor) setCardColor(value)
        if (colorFor === "appColor" && setAppColor) setAppColor(value)
    }

    return (<Select.Root onValueChange={(value) => setColor(value)}>
        <Select.Trigger
            className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
            aria-label="Food"
        >
            <Select.Value placeholder="Выберите цвет" />
            <Select.Icon className="text-violet11">
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className="p-[5px]">
                    <Select.Group>
                        <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                            Цвета
                        </Select.Label>
                        {colorFor === "cardColor" && Object.entries(cardColor).map(([key, value]) => (
                            <SelectItem key={key} value={value} >{key}</SelectItem>
                        ))}
                        {colorFor === "appColor" && Object.entries(appColor).map(([key, value]) => (
                            <SelectItem key={key} value={value} >{key}</SelectItem>
                        ))}
                    </Select.Group>
                </Select.Viewport>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
    )
};

interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof Select.Item> {
    children: React.ReactNode;
}

const SelectItem = React.forwardRef<React.ElementRef<typeof Select.Item>, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={classnames(
                    "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        );
    },
);

SelectItem.displayName = "SelectItem";

export default SelectDemo;
