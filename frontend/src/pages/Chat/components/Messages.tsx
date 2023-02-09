import { useEffect, useRef } from "react";
import { Message } from "../../../interfaces/Chat";
import ViewportList from "react-viewport-list";
import "./Messages.scss";

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  const ref = useRef(null);
  const listRef = useRef<any>(null);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <section ref={ref} className="messagesContainer">
      <ViewportList
        viewportRef={ref}
        ref={listRef}
        items={messages}
        itemMinSize={6}
        initialIndex={10000}
      >
        {(message, index) => (
          <div key={index}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              {message.message && (
                <div className="content ">{<p>{message.message.text}</p>}</div>
              )}
              {message.image && (
                <div className="content-image">
                  <img src={message.image} alt="sended" />
                </div>
              )}
            </div>
          </div>
        )}
      </ViewportList>
    </section>
  );
};

export default Messages;
