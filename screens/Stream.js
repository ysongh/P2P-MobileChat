import {  useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Tab, Divider } from '@rneui/themed';

import StreamSection from '../components/stream/Stream';
import Upgrade from '../components/stream/Upgrade';

export default function Stream() {
  const [currentTab, setCurrentTab] = useState(0);

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
      </Tab>

      <Divider width={20} />

      {currentTab === 0 && <StreamSection />}
      {currentTab === 1 && <Upgrade /> }

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
