import React, { useState } from "react";
import Picker, { EmojiClickData, Theme } from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import cameraImage from "../../../assets/camera.png";
import "./ChatInput.scss";

interface ChatInputProps {
  handleSendMessage: (msg: string, img: string) => {};
}

const ChatInput: React.FC<ChatInputProps> = ({ handleSendMessage }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [images] = useState([]);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject: EmojiClickData, event: MouseEvent) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event: any) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg, "");
      setMsg("");
    }
  };

  const onChange = (imageList: ImageListType) => {
    imageList.forEach((element: ImageType) => {
      if (element.dataURL) {
        handleSendMessage("", element.dataURL);
      }
    });
  };

  const handleError = (errors: any, _: any) => {
    console.log(errors);
  };

  return (
    <section className="chatInput">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="emoji-picker-react">
              <Picker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />

        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      <div className="image-send">
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          onError={handleError}
        >
          {({ onImageUpload, isDragging, dragProps }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                className="add-image-btn"
                onClick={onImageUpload}
                {...dragProps}
              >
                <img src={cameraImage} alt="camera" />
              </button>
            </div>
          )}
        </ImageUploading>
      </div>
    </section>
  );
};

export default ChatInput;
