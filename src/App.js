import React, {useEffect} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import MQTTConnection from './src/MQTTConnection'
import { Buffer } from 'buffer';
global.Buffer = Buffer; 

function App() {

  useEffect(() => {
    this.mqttConnect = new MQTTConnection()
    this.mqttConnect.onMQTTConnect = this.onMQTTConnect
    this.mqttConnect.onMQTTLost = this.onMQTTLost
    this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived
    this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered

    this.mqttConnect.connect('14.161.36.97', 1889)

    onMQTTConnect = () => {
        console.log('App onMQTTConnect')
        this.mqttConnect.subscribeChannel('hanth2')
    }

    onMQTTLost = () => {
        console.log('App onMQTTLost')
    }

    onMQTTMessageArrived = (message) => {
        console.log('App onMQTTMessageArrived: ', message);
        console.log('App onMQTTMessageArrived payloadString: ', message.payloadString);
    }

    onMQTTMessageDelivered = (message) => {
        console.log('App onMQTTMessageDelivered: ', message);
    }

    return () => {
      this.mqttConnect.close()
    }

  }, [])

  return (
    <View style={styles.container}>
      <Text>react_native_mqtt</Text>
      <Button
        title="Press me"
        onPress={() => this.mqttConnect.send('hanth2', "message send to channel hanth2 again")}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App;