import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore';

import { db } from "../firebase"

const chatCollectionRef = collection(db, "chat");

export const getChatsFromFirebase = async () => {
  const data = await getDocs(chatCollectionRef);
  let chats = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return chats;
}

export const addChatToFirebase = async (reciever, sender, input, currentTime) => {
  await addDoc(chatCollectionRef, { from: reciever, to: sender, text: input, date: currentTime });
}