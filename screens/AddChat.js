import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { createChatRoomToFirebase } from '../utils/firebase';

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#80e5ff"},
    })
  }, [navigation]);
  
  const createChat = async () => {
    await createChatRoomToFirebase(input);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <MaterialCommunityIcons name="chat-processing" size={24} color="black" />
        } />
      <Button onPress={createChat} title="Create new chat" />
    </View>
  );
};

export default AddChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});