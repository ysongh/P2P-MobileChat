import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore';

import { db } from "../firebase"

const chatCollectionRef = collection(db, "chat");

export const getChats = async () => {
  const data = await getDocs(chatCollectionRef);
  let chats = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  console.log(chats);
}