import ChatPage from "../Pages/ChatPage/ChatPage";
import HomePage from "../Pages/HomePage/HomePage";
import NewsPage from "../Pages/NewsPage/NewsPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import RegPage from "../Pages/modalReg/RegPage";
import userPorfilePage from "../Pages/userProfilePage/userPorfilePage";

enum Private {
    HOME_ROUTE = "/",
    PROFILE_ROUTE = "/profile",
    NEWS_PAGE = "/news",
    USER_PROFILE = "/profile/:userId",
    CHAT_ROUTE = "/chat"

}
enum Public {
    LOGIN_ROUTE = "/login",
    AUTH_ROUTE = "/auth"
}

export const authRoutes = [
    {
        path: Private.HOME_ROUTE,
        Component: HomePage
    },
    {
        path: Private.PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: Private.NEWS_PAGE,
        Component: NewsPage,
    },
    {
        path: Private.USER_PROFILE,
        Component: userPorfilePage
    },
    {
        path: Private.CHAT_ROUTE,
        Component: ChatPage
    }
]

export const publicRoutes = [
    {
        path: Public.AUTH_ROUTE,
        Component: RegPage,
    },
    {
        path: Public.LOGIN_ROUTE,
        Component: RegPage,
    },

]