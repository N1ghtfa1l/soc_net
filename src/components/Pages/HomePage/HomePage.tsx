const HomePage = () => {
    return (
        <>
            <div className="bg-[#202124]">
                <div className="w-[1200px] m-auto">
                    <div className="flex items-center justify-center h-screen flex-col animate-fadeIn ">
                        <div className="text-white text-8xl">Добро пожаловать !</div>
                        <div className="text-white text-5xl p-6">На главную страницу блога</div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <div className="w-[1200px] m-auto ">
                    <div className="flex h-[2000px] mt-[200px] flex-col">
                        <div className="text-black text-7xl sticky top-80 ">Здесь вы можете подробнее узнать про наш блог</div>
                    </div>
                </div>
            </div>

            <div className="w-[1200px] m-auto relative">
                <div className="flex h-[3000px] mt-[200px]  flex-col">
                    <div className="text-black w-[800px] right-[-200px] text-7xl absolute ">Добро пожаловать в наш новостной блог, где каждое событие имеет значение!
                        Здесь мы собираем свежие новости и актуальные события из разных уголков мира, предоставляя платформу для обмена мнениями и обсуждений.
                    </div>

                    <div className="text-black w-[800px] left-[-200px] text-7xl absolute top-[1000px]">
                        Наша цель — создать сообщество, где каждый может стать частью информационного потока: делиться своими новостями, комментировать и обмениваться взглядами на важные вопросы.
                    </div>
                    <div className="text-black w-[800px] right-[-200px] text-7xl absolute top-[2000px]">
                        Мы верим, что информация — это сила, и вместе мы можем создать осведомленное общество. Присоединяйтесь к нам, делитесь своими находками и оставайтесь в курсе последних событий!
                    </div>
                </div>
            </div>

        </>
    );
};

export default HomePage;