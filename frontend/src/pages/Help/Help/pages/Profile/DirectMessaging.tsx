import "./DirectMessaging.scss";
import HelpHeader from "../../components/HelpHeader";
import CollapseItem from "../../components/CollapseItem";
import RelatedTopics from "../../components/RelatedTopics";

import chatIcon from "../../../../../assets/help/chatIcon.png";
import chatIconMobile from "../../../../../assets/help/chatIconMobile.png";
import selectChat from "../../../../../assets/help/selectChat.png";
import chatInput from "../../../../../assets/help/chatInput.png";
import sendButton from "../../../../../assets/help/sendButton.png";
import cameraicon from "../../../../../assets/help/cameraicon.png";
import sendImage from "../../../../../assets/help/sendImage.png";
import emoticon from "../../../../../assets/help/emoticon.png";
import selectEmoticon from "../../../../../assets/help/selectEmoticon.png";

const DirectMessaging = () => {
  return (
    <div className="HelpArticleContainer">
      <HelpHeader text="Direct Messaging" />
      <section className="helpArticle helpparagraph">
        <p className="helpTextPrimary">
          You can use Whereabouts to chat with your friends.
        </p>
      </section>
      <CollapseItem
        title="Chat with others"
        content={
          <ol>
            <li>
              1. Click the Chat Icon on the left navigation
              <div className="screenshot">
                <img src={chatIcon} alt="chat icon " />
              </div>
              or chat icon on the mobile device.
              <div className="screenshot">
                <img src={chatIconMobile} alt="chat icon " />
              </div>
            </li>
            <li>
              2. Select the user on the left you want to chat with
              <div className="screenshot">
                <img src={selectChat} alt="chat screen " />
              </div>
            </li>
            <li>
              3. Enter your message in the input at the bottom
              <div className="screenshot">
                <img src={chatInput} alt="chat screen " />
              </div>
            </li>
            <li>
              4. Send a message by clicking the blue button
              <div className="screenshot">
                <img src={sendButton} alt="send icon " />
              </div>
            </li>
          </ol>
        }
      />
      <CollapseItem
        title="Send images to others"
        content={
          <ol>
            <li>
              1. Click the camera icon at the bottom of the chat
              <div className="screenshot">
                <img src={cameraicon} alt="camera icon " />
              </div>
            </li>
            <li>
              2. Select a photo from your device and click open.
              <div className="screenshot">
                <img src={sendImage} alt="send icon " />
              </div>
            </li>
          </ol>
        }
      />
      <CollapseItem
        title="Send emoticones"
        content={
          <ol>
            <li>
              1. Click on the smiling emoticon at the bottom of the chat
              <div className="screenshot">
                <img src={emoticon} alt="emoticon icon " />
              </div>
            </li>
            <li>
              2. Select an emoticon from the list
              <div className="screenshot">
                <img src={selectEmoticon} alt="send icon " />
              </div>
            </li>
          </ol>
        }
      />
      <RelatedTopics
        topics={[
          { text: "Staying Safe", link: "/help/stayingsafe" },
          { text: "Your Profile", link: "/help/yourprofile" },
        ]}
      />
    </div>
  );
};

export default DirectMessaging;
