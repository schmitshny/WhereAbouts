import { useEffect, useState } from "react";
import { getAllMessages, sendMessage } from "../../../api";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Message } from "../../../interfaces/Chat";
import { SignedUser, User } from "../../../interfaces/User/User";
import "./ChatContainer.scss";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import defaultAvatar from "../../../assets/profile-empty-image.png";

interface ChatContainerProps {
  currentChat: User;
  currentUser: SignedUser | undefined;
  socket: any;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  currentChat,
  currentUser,
  socket,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<Message>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMsg = async () => {
      if (currentChat && currentUser?.result?._id) {
        const response = await getAllMessages(
          currentUser.result._id,
          currentChat._id
        );

        setMessages(response.data);
      }
      setIsLoading(false);
    };
    getMsg();
  }, [currentChat, currentChat._id, currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: string) => {
        setArrivalMessage({ fromSelf: false, message: { text: msg } });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  const handleSendMessage = async (msg: string, image: string) => {
    if (currentUser?.result?._id) {
      await sendMessage(currentUser?.result?._id, currentChat._id, msg, image);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser?.result._id,
        message: msg,
        image,
      });
    }

    setMessages((msgs) => [
      ...msgs,
      { fromSelf: true, message: { text: msg }, image },
    ]);
  };

  return (
    <section className="chatContainer">
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={currentChat.avatarImage || defaultAvatar}
              alt="current Chat avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
          </div>
        </div>
      </div>
      {isLoading ? <LoadingSpinner /> : <Messages messages={messages} />}
      <ChatInput handleSendMessage={handleSendMessage} />
    </section>
  );
};

export default ChatContainer;
