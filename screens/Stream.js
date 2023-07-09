import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Tab, TabView, Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

import { getChatsFromPB } from '../utils/polybase';
import { getDAIBalance, getfDAIxBalance, approveDAITokens, upgradeDAIToDAIx } from '../utils/superfluid';

export default function Stream({ navigation }) {
  const { address, provider } = useWalletConnectModal();

  const [currentTab, setCurrentTab] = useState(0);
  const [input, setInput] = useState("");
  const [daiBalance, setDaiBalance] = useState(0);
  const [fdaixbalance, setFdaixbalance] = useState(0);

  useEffect(() => {
    getChatsFromPB();
  }, [])

  useEffect(() => {
    if(provider) {
      getDAI();
      getfDAIx();
    }
  }, [provider])

  const getDAI = async() => {
    const balance = await getDAIBalance(provider, address);
    setDaiBalance(balance.toString());
  }

  const getfDAIx = async() => {
    const balance = await getfDAIxBalance(provider, address);
    setFdaixbalance(balance.toString());
  }

  const approve = async () => {
    await approveDAITokens(provider, "10");
  }

  const updateToDAIx = async () => {
    await upgradeDAIToDAIx(provider, "10");
  }

  return (
    <View style={styles.container}>
      <Tab
        value={currentTab}
        onChange={(e) => setCurrentTab(e)}
        indicatorStyle={{
          height: 3,
        }}
      >
        <Tab.Item
          title="Stream"
          titleStyle={{ fontSize: 12 }}
        />
        <Tab.Item
          title="Upgrade"
          titleStyle={{ fontSize: 12 }}
        />
        <Tab.Item
          title="Setting"
          titleStyle={{ fontSize: 12 }}
        />
      </Tab>

      {currentTab === 0 && <Input 
        placeholder="Enter Address"
        value={input}
        onChangeText={(text) => setInput(text)} />
      }

      {currentTab === 1 && <>
        <Text style={styles.address}>{address}</Text>
        <Text>{daiBalance} DAI</Text>
        <Text>{fdaixbalance} FDAIx</Text>
        <Button
          title="Approve"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={approve}
        />
        <Button
          title="Upgrade"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={updateToDAIx}
        />
      </>
      }
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
