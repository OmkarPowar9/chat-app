import Img from "../../../assets/img.png";
import Attach from "../../../assets/attach.png";
import { useAuth } from "../../../context/authContext";
import { useChatContext } from "../../../context/chatContext";
import { useState } from "react";
import TextInput from "../../global/Input";
import { sendMessage, updateLastMessage } from "../../../services/chat";
import { handleImageUpload } from "../../../services";
import { v4 as uuidV4 } from "uuid";

function Input() {
  const { currentUser } = useAuth();
  const {
    data: { chatId, user },
  } = useChatContext();

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const handleSend = async () => {
    if (text === "") return;

    try {
      const messageId = uuidV4();

      if (img !== null) {
        await handleImageUpload(
          currentUser.uid,
          img,
          messageId,
          setPercentage,
          async (url) => {
            await sendMessage(messageId, chatId, text, currentUser?.uid, url);
          }
        );
      } else {
        await sendMessage(messageId, chatId, text, currentUser?.uid);
      }

      await updateLastMessage(chatId, text, currentUser?.uid, user?.uid);

      setText("");
      setImg("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDowm = async (event) => {
    if (text === "") return;

    try {
      if (event.code === "Enter") await handleSend();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="input">
      <TextInput
        type="text"
        placeholder="Type something..."
        value={text}
        setValue={setText}
        onKeyDown={handleKeyDowm}
      />

      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          value={img?.fileName || ""}
          onChange={(e) => setImg(e.target.files[0])}
          id="send-file"
          style={{ display: "none" }}
        />

        <label htmlFor="send-file">
          <img src={Img} alt="" />
        </label>

        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Input;
