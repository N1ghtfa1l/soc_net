import { useEffect, useState } from "react";
import { requestGet } from "../../API/funcAPi";
import { PostsData, UserData } from "../../API/interfaceAPI";
import PostsCard from "../../../UI/PostsCard";
import { useNavigate } from "react-router-dom";
import useStore from "../../../stors/appColorStors";

const NewsPage = () => {
    const [posts, setAllPosts] = useState<PostsData[]>([])
    const [users, setUsers] = useState<UserData[]>([])
    const { appColor } = useStore()
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllPosts()
        fetchAllUsers()
    }, [])

    const fetchAllPosts = async () => {
        const response = await requestGet("/user/posts/all") as PostsData[]
        setAllPosts(response)

    }

    const fetchAllUsers = async () => {
        const response = await requestGet("/user/all") as UserData[]
        setUsers(response);

    };

    const getAuthorName = (userId: number) => {
        const user = users.find((user: UserData) => user.id === userId)?.name
        return user
    };

    const openUserPage = (userId: number) => {
        navigate(`/profile/${userId}`)
    }


    return (
        <div className={`${appColor ? appColor : 'bg-[#202124]'}`}>
            <div className="min-h-screen h-auto w-[1200px] m-auto pt-20 text-white flex flex-col gap-6">
                <div className="text-4xl text-center">
                    Здесь вы сможете ознакомиться с постами других пользователей
                </div>
                {posts && posts.map((el: PostsData) =>
                    <PostsCard id={el.id} openUserPage={openUserPage} author={getAuthorName(el.user_id)} placeRender="news" userId={el.user_id} name={el.name} description={el.description} key={el.id} />
                )}
            </div>
        </div>
    );
};

export default NewsPage;