import { createContext } from "react";
import { useAuth } from "./authContext";
import { useReducer } from "react";
import { useContext } from "react";

export const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

const CHAT_INITIAL_STATE = {
  user: {},
  chatId: "",
};

export default function ChatProvider({ children }) {
  const { currentUser } = useAuth();

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const user = action.payload;
        return {
          user,
          chatId:
            currentUser?.uid > user?.uid
              ? currentUser.uid + user.uid
              : user.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, CHAT_INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}
