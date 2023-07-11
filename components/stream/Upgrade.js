import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

import { getDAIBalance, getfDAIxBalance, approveDAITokens, upgradeDAIToDAIx } from '../../utils/superfluid';

export default function Upgrade() {
  const { address, provider } = useWalletConnectModal();

  const [daiBalance, setDaiBalance] = useState(0);
  const [fdaixbalance, setFdaixbalance] = useState(0);

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
    <>
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
  );
}

const styles = StyleSheet.create({
  address: {
    marginTop: 15,
    marginBottom: 20
  }
});
