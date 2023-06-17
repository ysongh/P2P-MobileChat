import { Polybase } from "@polybase/client";

import { POLYBASE_NAMESPACE } from "../keys";

export const db = new Polybase({
  defaultNamespace: POLYBASE_NAMESPACE
});

export const getChatsFromPB = async () => {
  try{
    const data = await db.collection("Chat").get();
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const addChatToPB = async (id, to, from, text) => {
  try{
    await db.collection("Chat").create([id, to, from, text]); 
  } catch (error) {
    console.log(error);
    return null;
  }
}