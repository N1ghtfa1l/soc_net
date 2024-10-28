import { useParams } from 'react-router-dom';
import ProfilePage from '../ProfilePage/ProfilePage';
import { useEffect, useState } from 'react';
import { requestGet } from '../../API/funcAPi';
import { UserData } from '../../API/interfaceAPI';



const userPorfilePage = () => {
    const { userId } = useParams<{ userId: string }>()
    const [userData, setUserData] = useState<UserData>()
    const [userPosts, setUserPosts] = useState<any>()

    useEffect(() => {
        fetchUser()
        fetchUserPosts()
    }, [])
    const fetchUser = async () => {
        const response = await requestGet(`/user/one/${userId}`) as UserData
        setUserData(response)
    }
    const fetchUserPosts = async () => {
        const response = await requestGet(`/user/posts/${userId}`)
        setUserPosts(response)
    }
    return (
        <div>
            {userData && <ProfilePage  descriptionUser={userData.description} userPosts={userPosts} emailUser={userData?.email} nameUser={userData?.name} renderPlace='userProfile' />}
        </div>
    );
};

export default userPorfilePage;