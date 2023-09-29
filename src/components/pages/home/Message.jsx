import { useRef } from "react";
import { useAuth } from "../../../context/authContext";
import { useChatContext } from "../../../context/chatContext";
import { useEffect } from "react";

function Message({ message }) {
  const { currentUser } = useAuth();
  const {
    data: { user },
  } = useChatContext();

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message?.senderId === currentUser?.uid && "owner"}`}
    >
      <div className="message-info">
        <img
          src={
            message?.senderId === currentUser.uid
              ? currentUser?.photoURL
              : user?.imgUrl
          }
          alt=""
        />
        <span>Just now</span>
      </div>

      <div className="message-content">
        <p>{message?.text}</p>
        <img src={message?.imgUrl} alt="" />
      </div>
    </div>
  );
}

export default Message;
