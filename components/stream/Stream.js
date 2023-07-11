import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

import { getDAIBalance, getfDAIxBalance, streamDAIx, calculateFlowRate } from '../../utils/superfluid';

export default function Stream() {
  const { address, provider } = useWalletConnectModal();

  const [to, setTo] = useState("");
  const [flowRate, setFlowRate] = useState(0);
  const [flowRateDisplay, setFlowRateDisplay] = useState("")

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
    <>
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
  );
}