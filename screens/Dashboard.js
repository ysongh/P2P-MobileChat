import { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { getChatRoomsFromFirebase } from '../utils/firebase';
import ChatListItem from '../components/ChatListItem';
export default function Dashboard({ navigation }) {
  const { open, provider, isConnected } = useWalletConnectModal();

  const [input, setInput] = useState("");
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    if (!isConnected) navigation.navigate('Home');
  }, [isConnected])

  const logout = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#80e5ff"},
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 5
          }}
        >
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
            <MaterialCommunityIcons name="lead-pencil" size={30} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={logout}>
            <MaterialIcons name="logout" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  useEffect(() => {
    getChatrooms();
  }, [])

  const getChatrooms = async () => {
    const chatrooms = await getChatRoomsFromFirebase();
    setChatRooms(chatrooms);
    console.log(chatrooms);
  }

  return (
    <View>
      <Text style={styles.label}>Search by Address</Text>
      <Input 
        placeholder="Enter Address"
        value={input}
        onChangeText={(text) => setInput(text)} />
      <ScrollView style={{ height: "100%" }}>
        {chatRooms.map(c => (
          <ChatListItem key={c.id} id={c.id} text={c.text} navigation={navigation} />
        ))}
      </ScrollView>
      <Button
        title="Stream"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 310,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate('Stream')}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold"
  }
});
