import { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#80e5ff"},
    })
  }, [navigation])

  return (
    <View>
      <Text>Add Chat</Text>
      <Input
        placeholder='Enter a chat name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
          <MaterialCommunityIcons name="chat-processing" size={24} color="black" />
        } />
    </View>
  );
};

export default AddChat;

const style = StyleSheet.create({});