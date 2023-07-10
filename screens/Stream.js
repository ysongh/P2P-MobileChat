import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Tab, TabView, Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

import { getChatsFromPB } from '../utils/polybase';
import { getDAIBalance, getfDAIxBalance, approveDAITokens, upgradeDAIToDAIx, streamDAIx, calculateFlowRate } from '../utils/superfluid';

export default function Stream({ navigation }) {
  const { address, provider } = useWalletConnectModal();

  const [currentTab, setCurrentTab] = useState(0);
  const [to, setTo] = useState("0xaa90e02e88047232288D01Fe04d846e8A4Cc88dd");
  const [flowRate, setFlowRate] = useState(0);
  const [flowRateDisplay, setFlowRateDisplay] = useState("")
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

  const stream = async() => {
    try {
      await streamDAIx(provider, address, to, flowRate);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFlowRateChange = (value) => {
    setFlowRate(value);
    const newFlowRateDisplay = calculateFlowRate(value);
    if(newFlowRateDisplay) {
      setFlowRateDisplay(newFlowRateDisplay.toString())
    }
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

      {currentTab === 0 && <>
        <Input 
          placeholder="Enter Address"
          value={to}
          onChangeText={(text) => setTo(text)} />
        <Input 
          placeholder="Flow Rate"
          value={flowRate}
          onChangeText={(text) => handleFlowRateChange(text)} />
        {flowRateDisplay && <Text>{flowRateDisplay} / Month</Text>}
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
          onPress={stream}
        />
       </>
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
