import { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from '@rneui/themed';

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
        onChange={(text) => setInput(text)} />
    </View>
  );
};

export default AddChat;

const style = StyleSheet.create({});