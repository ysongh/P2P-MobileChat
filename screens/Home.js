import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { Web3Modal, Web3Button, useWeb3Modal } from '@web3modal/react-native';

import { providerMetadata, sessionParams } from '../utils/walletconnect';
import { WALLETCONNECT_PROJECTID } from '../keys';

export default function Home({ navigation }) {
  const { isConnected } = useWeb3Modal();

  useEffect(() => {
    if (isConnected) navigation.replace('Dashboard');
  }, [isConnected])
  
  return (
    <View style={styles.container}>
      <Text
        h1Style={{}}
        h2Style={{}}
        h3Style={{}}
        h4
        h4Style={{}}
        style={{ marginBottom: 20}}
      >
        Welcome to P2P MobileChat
      </Text>
      <Web3Button />
      <Web3Modal projectId={WALLETCONNECT_PROJECTID} providerMetadata={providerMetadata} sessionParams={sessionParams} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
