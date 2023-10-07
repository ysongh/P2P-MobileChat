import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore';

import { db } from "../firebase"

const chatCollectionRef = collection(db, "chat");

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

export const addChatToFirebase = async (reciever, sender, input, currentTime) => {
  try {
    await addDoc(chatCollectionRef, { from: reciever, to: sender, text: input, date: currentTime });
  } catch (error) {
    console.error(error);
  }
}