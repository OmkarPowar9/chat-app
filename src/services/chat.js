import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbInstance } from "../lib/firebase";

export async function findUserChats(currentUserId, receiver, chatId) {
  try {
    const chatRef = doc(dbInstance, "chats", chatId);
    const res = await getDoc(chatRef);

    if (!res.exists()) {
      await setDoc(chatRef, {
        messages: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const userChatRef = doc(dbInstance, "userChats", currentUserId);
      await updateDoc(userChatRef, {
        [chatId + ".userInfo"]: {
          uid: receiver.uid,
          displayName: receiver.name,
          imgUrl: receiver.imgUrl,
          lastMessage: "",
        },

        [chatId + ".date"]: serverTimestamp(),
      });
    }

    return { id: res.id, ...res.data() };
  } catch (e) {
    console.error(e);
  }
}

export async function sendMessage(
  messageId,
  chatId,
  message,
  senderId,
  imgUrl = ""
) {
  try {
    const chatRef = doc(dbInstance, "chats", chatId);
    await updateDoc(chatRef, {
      messages: arrayUnion({
        id: messageId,
        text: message,
        senderId,
        imgUrl,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }),
    });
  } catch (e) {
    console.error(e);
  }
}

export async function updateLastMessage(chatId, message, senderId, receiverId) {
  try {
    let chatRef = doc(dbInstance, "userChats", senderId);
    await updateDoc(chatRef, {
      [chatId + ".userInfo.lastMessage"]: message,

      [chatId + ".date"]: serverTimestamp(),
    });

    chatRef = doc(dbInstance, "userChats", receiverId);
    await updateDoc(chatRef, {
      [chatId + ".lastMessage"]: {
        text: message,
      },

      [chatId + ".date"]: serverTimestamp(),
    });
  } catch (e) {
    console.error(e);
  }
}
