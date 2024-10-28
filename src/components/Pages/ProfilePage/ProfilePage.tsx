import { FC, useEffect, useState } from 'react';
import avatar from '../../img/photo.png'
import { requestGet, requestPost } from '../../API/funcAPi';
import DialogPost from '../../../UI/DialogPost';
import TextBox from '../../../UI/TextBox';
import { toast, ToastContainer } from 'react-toastify';
import PostsCard from '../../../UI/PostsCard';
import { PostsData } from '../../API/interfaceAPI';
import DialogSettings from '../../../UI/DialogSettings';
import Settings from '../../../UI/icons/SettingsIcon';
import useCardStore from '../../../stors/CardColorStors';
import useAppStore from '../../../stors/appColorStors';
import axios from 'axios';



interface ProfilePageProps {
    renderPlace?: "userProfile" | "myProfile"
    nameUser?: string
    emailUser?: string
    userPosts?: PostsData[]
    descriptionUser?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ renderPlace = "myProfile", nameUser, emailUser, userPosts, descriptionUser }) => {
    const [posts, setPosts] = useState<any>()
    const [name, setName] = useState<string>("")
    const [description, setDesc] = useState<string>("")
    const [userData, setUserData] = useState<string>("")
    const [descriptionUserProfile, setDescriptionUser] = useState<string | undefined>(descriptionUser)
    const { setCardColor } = useCardStore()
    const { setAppColor, appColor } = useAppStore()
    const usePageData = renderPlace === "userProfile" ? localStorage.getItem('email') === emailUser : true

    useEffect(() => {
        fetchPosts()
        fetchDataUser()
    }, [])

    const fetchPosts = async () => {
        const response = await requestGet("/user/posts")
        setPosts(response)
    }

    const createPosts = async () => {
        const postData = {
            name: name,
            description: description
        }
        await requestPost("/create/post", postData)
        toast(`Пост ${postData.name} создан!`)
        fetchPosts()
    }
    const fetchDataUser = async () => {
        const response = await requestGet(`/user/one/${localStorage.getItem('id')}`)
        //@ts-ignore
        setUserData(response.description)
    }

    const deletePost = async (id: number) => {
        await requestGet(`/user/posts/delete/${id}`)
        toast('Пост удален!')
        fetchPosts()
    }
    const updateDesc = async (userId: any) => {
        try {
            const updateData = {
                description: userData,
            };
            await axios.put(`http://localhost:8000/user/update/${userId}`, updateData,);
        } catch (error) {
            toast.error("Ошибка при обновлении описания");
        }
    };

    return (
        <div className={`${appColor ? appColor : 'bg-[#202124]'} `}>
            <div className="flex flex-col items-center justify-center min-h-screen text-white w-[1200px] m-auto flex-wrap pt-[100px] gap-[50px]">
                <div className="bg-gray-700 w-full h-[500px] rounded-lg relative">
                    {renderPlace === "myProfile" && <DialogSettings setAppColor={setAppColor} setCardColor={setCardColor}>
                        <Settings className="cursor-pointer  absolute right-3 top-4 hover:animate-spin" />
                    </DialogSettings>}
                    <div className='flex flex-col p-[10px]'>
                        <div className=' flex justify-between'>
                            <div className='flex flex-col items-center justify-start'>
                                <img className='rounded-[50%] h-60' src={avatar} alt="#" />
                                <div className='text-5xl'>{renderPlace === "myProfile" ? localStorage.getItem('name') : `${nameUser}`}</div>
                            </div>
                            <div>
                                <div className='absolute top-[50px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
                                    <div >Всего постов: {posts && posts.length}</div>
                                    {usePageData && <DialogPost
                                        nameInput={<TextBox value={name} onChange={(e) => setName(e.target.value)} />}
                                        descInput={<TextBox value={description} onChange={(e) => setDesc(e.target.value)} />}
                                        createPosts={createPosts}
                                    />}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col pt-10'>
                            <div>Описание</div>
                            {renderPlace === "userProfile" && <textarea readOnly value={descriptionUserProfile} onChange={(e) => setDescriptionUser(e.target.value)} className='h-[100px] p-[10px] rounded-3xl  resize-none bg-[rgb(42,44,48)]' />}
                            {renderPlace === "myProfile" && <textarea value={userData} onChange={(e) => setUserData(e.target.value)} className='h-[100px] p-[10px] rounded-3xl  resize-none bg-[rgb(42,44,48)]' />}
                            {renderPlace === "myProfile" && <button onClick={() => updateDesc(localStorage.getItem('id'))}>обновить</button>}

                        </div>
                    </div>
                </div>
                <div className='text-6xl my-[50px]'>{usePageData ? "Ваши посты" : "Посты пользователя"}</div>
                {renderPlace === "myProfile" && posts && posts.map((el: PostsData) => <PostsCard
                    userId={el.user_id}
                    key={el.id}
                    deletePost={deletePost}
                    id={el.id}
                    renderPlace='myProfile'
                    name={el.name}
                    description={el.description}
                />)}
                {renderPlace === "userProfile" && userPosts && userPosts.map((el: PostsData) => <PostsCard
                    userId={el.user_id}
                    key={el.id}
                    name={el.name}
                    id={el.id}
                    description={el.description}
                />)}

            </div>
            <ToastContainer />

        </div>
    );
};

export default ProfilePage;