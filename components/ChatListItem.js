import React from "react";
import { ListItem, Avatar } from '@rneui/themed';

const ChatListItem = ({ id, text, navigation }) => {
  return (
    <ListItem key={id} onPress={() => navigation.navigate('Chat', {reciever: "0x0", sender: "0x1"} )} bottomDivider>
      <Avatar
        rounded
        size={30}
        title="CJ"
        containerStyle={{
          backgroundColor: "green"
        }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {id}
        </ListItem.Title>
        <ListItem.Subtitle>
          {text}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default ChatListItem;