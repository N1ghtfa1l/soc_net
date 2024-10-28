import { FC } from "react";
import useStore from "../stors/CardColorStors";
import { TrashIcon } from "@radix-ui/react-icons";

interface PostsCardProps {
    author?: string
    name: string
    description: string
    id: number
    userId: number
    placeRender?: "profile" | "news"
    openUserPage?: (userid: number) => void;
    deletePost?: (id: number) => void;
    renderPlace?: "myProfile"
}

const PostsCard: FC<PostsCardProps> = ({ name, description, placeRender, author, openUserPage, userId, id, deletePost, renderPlace }) => {
    const { cardColor } = useStore()


    return (
        <>
            <div className={` w-full min-h-[200px] rounded-lg relative break-words  border-[10px] ${cardColor ? cardColor : "text-black bg-[#f0efef] border-black"}`}>
                {renderPlace === "myProfile" && <TrashIcon
                    onClick={() => deletePost && deletePost(id)}
                    className="absolute top-0 right-0 cursor-pointer"
                    width={20}
                    height={40}
                />}
                {placeRender === "news" && openUserPage && <div onClick={() => openUserPage(userId)} className="absolute cursor-pointer top-[10px] right-[40px]">Автор: {author} </div>}
                <div className='flex flex-col p-[10px] '>
                    <div className=' flex items-center flex-col justify-between'>
                        <div className="mb-[50px] max-w-[600px]">{name}</div>
                        <div className="w-full">{description}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostsCard;