import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import '@walletconnect/react-native-compat';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';

import { providerMetadata, sessionParams } from '../utils/walletconnect';
import { WALLETCONNECT_PROJECTID } from '../keys';

export default function Home({ navigation }) {
  const { open, address, provider, isConnected } = useWalletConnectModal();

  useEffect(() => {
    if (isConnected) navigation.navigate('Dashboard');
  }, [isConnected])

  const logout = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

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
      <Text style={styles.address}>{address}</Text>
      {isConnected && <Button
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
      />}
      <Button
        title={isConnected ? 'Logout' : 'Connect'}
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={logout}
      />
      <WalletConnectModal
        projectId={WALLETCONNECT_PROJECTID}
        providerMetadata={providerMetadata}
      />
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
  address: {
    marginBottom: 10
  }
});
