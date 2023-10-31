import { useEffect, useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar, Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { getChatsFromFirebase } from '../utils/firebase';

export default function Dashboard({ navigation }) {
  const { open, provider, isConnected } = useWalletConnectModal();

  const [input, setInput] = useState("");

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
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={logout}>
            <MaterialIcons name="logout" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [])

  useEffect(() => {
    getChatsFromFirebase();
  }, [])

  return (
    <View>
      <Text style={styles.label}>Search by Address</Text>
      <Input 
        placeholder="Enter Address"
        value={input}
        onChangeText={(text) => setInput(text)} />
      <ListItem onPress={() => navigation.navigate('Chat', {reciever: "0x0", sender: "0x1"} )} bottomDivider>
        <Avatar
          rounded
          size={30}
          title="CJ"
          containerStyle={{
            backgroundColor: "green"
          }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            0x0
          </ListItem.Title>
          <ListItem.Subtitle>
            Testing...
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem onPress={() => navigation.navigate('Chat', {reciever: "0x1", sender: "0x0"} )} bottomDivider>
        <Avatar
          rounded
          size={30}
          title="FC"
          containerStyle={{
            backgroundColor: "blue"
          }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            0x1
          </ListItem.Title>
          <ListItem.Subtitle>
           Hi
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      
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
