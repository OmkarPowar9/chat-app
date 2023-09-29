import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { dbInstance } from "../lib/firebase";

export function useChats(currentUserId) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userChatRef = doc(dbInstance, "userChats", currentUserId);
    const unsub = onSnapshot(userChatRef, (doc) => {
      setChats(doc.data());
    });

    return () => {
      unsub();
    };
  }, [currentUserId]);

  return { chats };
}

export function useMessages(chatId) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId === undefined || chatId === "") return;

    const messageRef = doc(dbInstance, "chats", chatId);
    const unsub = onSnapshot(messageRef, (doc) => {
      if (doc.exists()) setMessages(doc.data()?.messages);
    });

    return () => {
      unsub();
    };
  }, [chatId]);

  return { messages };
}
