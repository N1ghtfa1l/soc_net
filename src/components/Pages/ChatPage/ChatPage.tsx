import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import useStore from "../../../stors/appColorStors";
import TextBox from "../../../UI/TextBox";
import { MessageData } from "../../API/interfaceAPI";
import MessageCard from "../../../UI/MessageCard";

const ChatPage = () => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const clientId = useRef(Math.floor(Math.random() * 1000));
    const wsUrl = `ws://localhost:8000/chat/ws/${clientId.current}`;
    const socketRef = useRef<WebSocket | null>(null);
    const { appColor } = useStore();

    useEffect(() => {
        socketRef.current = new WebSocket(wsUrl);
        socketRef.current.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: prevMessages.length + 1,
                    message: newMessage.message,
                    user: newMessage.name,
                },
            ]);
        };
        return () => {
            socketRef.current?.close();
        };
    }, [wsUrl]);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/chat/messages");
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            toast('Error fetching messages');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const sendMessage = () => {
        if (socketRef.current && inputValue) {
            const messageData = {
                message: inputValue,
                name: localStorage.getItem('name'),
            };
            console.log(messageData);
            socketRef.current.send(JSON.stringify(messageData));
            setInputValue("");
        }
    };

    return (
        <div className={`${appColor ? appColor : 'bg-[#202124]'}`}>
            <div className="min-h-screen justify-between justify-items h-auto w-[1200px] m-auto pt-20 text-white flex flex-col gap-6">
                        <div className='text-3xl  font-bold my-[20px]'>Здесь вы можете пообщаться с другими участниками блога</div>
                <div className="flex-grow flex flex-col justify-between">
                    <div className="flex flex-col gap-3 max-h-[700px] overflow-y-auto">
                        {messages.map((el: MessageData) =>
                            <MessageCard author={el.user} key={el.id}>{el.message}</MessageCard>
                        )}
                    </div>
                    <div className="flex items-center mb-[100px]">
                        <TextBox
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            label="Введите сообщение"
                            className="bg-slate-500 bottom-0 min-w-[700px] "
                        />
                        <button className="ml-[10px] p-[10px] border-white border-[1px]" onClick={sendMessage}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
