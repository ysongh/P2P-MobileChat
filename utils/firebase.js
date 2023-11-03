import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore';

import { db } from "../firebase"

const chatCollectionRef = collection(db, "chat");
const chatsCollectionRef = collection(db, "chats");

export const getChatsFromFirebase = async () => {
  try {
    const data = await getDocs(chatCollectionRef);    
    const chats = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return chats;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getChatRoomsFromFirebase = async () => {
  try {
    const data = await getDocs(chatsCollectionRef);    
    const chatrooms = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return chatrooms;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export const createChatRoomToFirebase = async (input) => {
  try {
    await addDoc(chatsCollectionRef, { text: input });
  } catch (error) {
    console.error(error);
  }
}

export const addChatToFirebase = async (reciever, sender, input, currentTime) => {
  try {
    await addDoc(chatCollectionRef, { from: reciever, to: sender, text: input, date: currentTime });
  } catch (error) {
    console.error(error);
  }
}