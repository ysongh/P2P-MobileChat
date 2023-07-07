import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { Web3Modal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';

import { getChatsFromPB } from '../utils/polybase';
import { initializingSuperfluid, getfDAIxBalance } from '../utils/superfluid';
import { providerMetadata } from '../utils/walletconnect';
import { WALLETCONNECT_PROJECTID } from '../keys';

export default function Dashboard({ navigation }) {
  const { address, provider } = useWalletConnectModal();

  const [input, setInput] = useState("");
  const [fdaixbalance, setFdaixbalance] = useState(0);

  useEffect(() => {
    getChatsFromPB();
  }, [])

  useEffect(() => {
    if(provider) getfDAIx();
  }, [provider])

  const getfDAIx = async() => {
    const balance = await getfDAIxBalance(provider, address);
    setFdaixbalance(balance.toString());
  }

  const getENS = async () => {
    const wallet = ethers.Wallet.createRandom();
    console.log('Wallet address:', wallet.address);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.address}>{address}</Text>
      <Text>{fdaixbalance} FDAI</Text>
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
