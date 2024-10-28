import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="z-10 uppercase text-white absolute top-0 left-1/2 transform -translate-x-1/2 h-[50px] flex items-center justify-between w-[1200px] m-auto ">
            <div><Link to={"/"}>Главная</Link></div>
            <div><Link to={"/news"}>Новостная страница</Link></div>
            <div><Link to={"/chat"}>общение</Link></div>
            <div><Link to={"/profile"}>Мой профиль</Link></div>
        </div>
    );
};

export default Header;