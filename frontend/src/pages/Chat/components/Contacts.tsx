import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contacts.scss";
import chatLogo from "../../../assets/chat/chat.png";
import defaultAvatar from "../../../assets/profile-empty-image.png";
import { SignedUser, User } from "../../../interfaces/User/User";

interface ContactsProps {
  contacts: User[];
  currentUser: SignedUser | undefined;
  changeChat: (chat: User) => void;
}

const Contacts: React.FC<ContactsProps> = ({
  contacts,
  currentUser,
  changeChat,
}) => {
  const [currentSelected, setCurrentSelected] = useState<number>();
  const navigate = useNavigate();

  const changeCurrentChat = (index: number, contact: User) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <section className="contactsContainer">
      <div className="contactsContainer__brand">
        <img src={chatLogo} alt="logo" />
        <h3>Chat</h3>
      </div>
      <div className="contactsContainer__contacts">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img src={contact.avatarImage || defaultAvatar} alt="" />
              </div>
              <div className="username">
                <h3>{contact.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="current-user">
        <div className="avatar">
          <img
            src={currentUser?.result?.avatarImage || defaultAvatar}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{currentUser?.result?.name}</h2>
        </div>
      </div> */}
    </section>
  );
};

export default Contacts;
