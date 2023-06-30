import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { Web3Modal, useWeb3Modal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';

import { getChatsFromPB } from '../utils/polybase';
import { providerMetadata } from '../utils/walletconnect';
import { WALLETCONNECT_PROJECTID } from '../keys';

export default function Dashboard({ navigation }) {
  const { open, isConnected } = useWeb3Modal();

  const [input, setInput] = useState("");

  useEffect(() => {
    getChatsFromPB();
  }, [])

  const getENS = async () => {
    const wallet = ethers.Wallet.createRandom();
    console.log('Wallet address:', wallet.address);
  }

  return (
    <View style={styles.container}>
      <Input 
        placeholder="Enter Address"
        value={input}
        onChangeText={(text) => setInput(text)} />
      <Button
        title={isConnected ? 'View Account' : 'Connect'}
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={open}
      />
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
      <Web3Modal projectId={WALLETCONNECT_PROJECTID} providerMetadata={providerMetadata} />
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
});
