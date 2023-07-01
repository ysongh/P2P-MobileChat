import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

import { providerMetadata, sessionParams } from '../utils/walletconnect';
import { WALLETCONNECT_PROJECTID } from '../keys';

export default function Home({ navigation }) {
  const { open, isConnected } = useWalletConnectModal();

  useEffect(() => {
    if (isConnected) navigation.replace('Dashboard');
  }, [])

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
        title="Dashboard"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate("Dashboard")}
      />
      <WalletConnectModal projectId={WALLETCONNECT_PROJECTID} providerMetadata={providerMetadata} />
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
