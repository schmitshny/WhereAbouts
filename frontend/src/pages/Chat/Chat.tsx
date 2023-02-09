import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, host } from "../../api";
import { SignedUser, User } from "../../interfaces/User/User";
import "./Chat.scss";
import ChatContainer from "./components/ChatContainer";
import Contacts from "./components/Contacts";
import Welcome from "./components/Welcome";
import { io, Socket } from "socket.io-client";

const Chat = () => {
  const [currentUser, setCurrentUser] = useState<SignedUser>();
  const [contacts, setContacts] = useState<User[]>([]);
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);
  const socket = useRef<Socket>();
  const navigate = useNavigate();

  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem("profile")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("profile")!));
      }
    };
    setUser();
  }, [navigate]);

  const handleChatChange = (chat: User) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket.current! = io(host);
      socket.current!.emit("add-user", currentUser.result?._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const getContats = async () => {
      if (currentUser?.result?._id) {
        const { data } = await getAllUsers(currentUser?.result?._id);
        setContacts(data);
      } else {
        // navigate("/setAvatar");
      }
    };
    getContats();
  }, [currentUser, navigate]);

  return (
    <main className="chatPageContainer">
      <main className="chat">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {!currentChat ? (
          <Welcome username={currentUser?.result?.name} />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </main>
    </main>
  );
};

export default Chat;
