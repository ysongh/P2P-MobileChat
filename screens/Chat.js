import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { Button, Text } from '@rneui/themed';

import { getChatsFromPB, addChatToPB } from '../utils/polybase';

export default function Chat() {
  const [input, setInput] = useState("");

  useEffect(() => {
    getChatsFromPB();
  }, [])

  return (
    <SafeAreaView style={{  flex: 1, backgroundColor: '#fff'}}>
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding": "height"}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>

          </ScrollView>
          <View style={styles.footer}>
            <TextInput value={input} onChange={(text) => setInput(text)} placeholder="msg..."/>
            <TouchableOpacity onPress={() => addChatToPB("2", "0x0", "0x0", input)}>
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
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  }
});
