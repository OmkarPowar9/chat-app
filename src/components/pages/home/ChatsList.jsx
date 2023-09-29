import { useAuth } from "../../../context/authContext";
import { useChatContext } from "../../../context/chatContext";
import { useChats } from "../../../hooks/chats";

function ChatsList() {
  const { currentUser } = useAuth();
  const { dispatch } = useChatContext();

  const { chats } = useChats(currentUser?.uid);

  const handleSelectChat = (userInfo) => {
    dispatch({
      type: "CHANGE_USER",
      payload: userInfo,
    });
  };

  return (
    <div>
      {Object.entries(chats)
        .sort((a, b) => b[1].date - a[1].date)
        .map((chat, idx) => (
          <div
            className="user-chat"
            key={chat[0]}
            onClick={() => handleSelectChat(chat[1]?.userInfo)}
          >
            <img src={chat[1]?.userInfo?.imgUrl} alt="" />

            <div className="user-chat-info">
              {console.log(chat[1])}
              <span>{chat[1]?.userInfo?.displayName}</span>
              <p>{chat[1]?.userInfo?.lastMessage}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ChatsList;
