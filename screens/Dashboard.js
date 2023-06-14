import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { Web3Modal, useWeb3Modal } from '@web3modal/react-native';

import { getChatsFromPB, addChatToPB } from '../utils/polybase';
import { WALLETCONNECT_PROJECTID } from '../keys';

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
};

export default function Dashboard({ navigation }) {
  const { open, isConnected } = useWeb3Modal();

  useEffect(() => {
    getChatsFromPB();
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
        Dashboard
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
        title="Chat"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => navigation.navigate('Chat')}
      />
      <Button
        title="Add Chat"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => addChatToPB("1", "0x0", "0x0", "Test")}
      />
      <Web3Modal projectId={WALLETCONNECT_PROJECTID} providerMetadata={providerMetadata} />
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
