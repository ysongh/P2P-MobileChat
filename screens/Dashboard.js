import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar, Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

import { getChatsFromPB } from '../utils/polybase';

export default function Dashboard({ navigation }) {
  const { address } = useWalletConnectModal();

  const [input, setInput] = useState("");

  useEffect(() => {
    getChatsFromPB();
  }, [])

  return (
    <View>
      <Text style={styles.address}>{address}</Text>
      <ListItem>
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
      <Input 
        placeholder="Enter Address"
        value={input}
        onChangeText={(text) => setInput(text)} />
      <Button
        title="Chat 0x0"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate('Chat', {reciever: "0x0", sender: "0x1"} )}
      />
      <Button
        title="Chat 0x1"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate('Chat', {reciever: "0x1", sender: "0x0"} )}
      />
       <Button
        title="Stream"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
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
  address: {
    marginTop: 15,
    marginBottom: 20
  }
});
