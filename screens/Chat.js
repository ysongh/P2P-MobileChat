import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Avatar, Text } from '@rneui/themed';

import { getChatsFromPB, addChatToPB } from '../utils/polybase';
import { dateToUnixTime } from '../utils/date';

export default function Chat() {
  const [messages, seMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getChats();
  }, [])

  const getChats = async () => {
    const chats = await getChatsFromPB();
    seMessages(chats);
  }

  const sendMessage = async() => {
    Keyboard.dismiss();
    const currentTime = await dateToUnixTime();
    addChatToPB(currentTime.toString(), "0x1", "0x1", input);
    setInput("");
  }

  return (
    <SafeAreaView style={{  flex: 1, backgroundColor: '#fff'}}>
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
            {messages.map(m => (
              m.data.from === "0x0"
                ? <View style={styles.reciever} key={m.data.id}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      size={30}
                      title="Fc"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                        backgroundColor: "green"
                      }} />
                    <Text style={styles.recieverText}>{m.data.text}</Text>
                  </View>
                : <View style={styles.sender} key={m.data.id}>
                    <Avatar
                      rounded
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      size={30}
                      title="CJ"
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                        backgroundColor: "blue"
                      }} />
                    <Text style={styles.senderText}>{m.data.text}</Text>
                    <Text style={styles.senderName}>0x0</Text>
                  </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput style={styles.textInput} value={input} onChangeText={(text) => setInput(text)} placeholder="msg..." />
            <TouchableOpacity onPress={sendMessage}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reciever: {
    padding: 15,
    backgroundColor: "#E9E4F0",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative"
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  sender: {
    padding: 15,
    backgroundColor: "#7F3FBF",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative"
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white"
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 10,
    borderColor: "transparent",
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#E9E4F0",
    color: "grey"
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10
  }
});
