import { FC, ReactNode } from "react";

interface MessageCardProps {
    children: ReactNode
    author: string
}

const MessageCard: FC<MessageCardProps> = ({ children, author }) => {
    return (
        <div className="bg-inherit min-w-[200px]">
            {author}: {children}
        </div>
    );
};

export default MessageCard;