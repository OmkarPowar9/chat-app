import Cam from "../../../assets/cam.png";
import Add from "../../../assets/add.png";
import More from "../../../assets/more.png";
import MessageList from "./MessageList";
import Input from "./Input";
import { useChatContext } from "../../../context/chatContext";

function Chats() {
  const {
    data: { user },
  } = useChatContext();

  return (
    <div className="chats">
      <div className="chat-info">
        <span>{user?.displayName}</span>

        <div className="chat-icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>

      <MessageList />
      <Input />
    </div>
  );
}

export default Chats;
