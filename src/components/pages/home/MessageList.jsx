import Message from "./Message";
import { useChatContext } from "../../../context/chatContext";
import { useMessages } from "../../../hooks/chats";

function MessageList() {
  const {
    data: { chatId },
  } = useChatContext();

  const { messages } = useMessages(chatId);

  return (
    <div className="messages">
      {messages?.map((message) => (
        <Message key={message?.id} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
