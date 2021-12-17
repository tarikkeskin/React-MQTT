import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import axios from 'axios';

const  Receiver = ({ payload }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (payload.topic) {
      console.log("INSIDE RECEIVER USE EFFECT");
      setMessages(messages => [...messages, payload])

      console.log(payload.message);

      axios.post('/writejson', {
        data:payload.message
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
            console.log(error)
      })
      
    }
  }, [payload])

  const renderListItem = (item) => (
    <List.Item>
      <List.Item.Meta
        title={item.topic}
        description={item.message}
      />
    </List.Item>
  )

  return (
    <Card
      title="Receiver"
    >
      <List
        size="small"
        bordered
        dataSource={messages}
        renderItem={renderListItem}
      />
    </Card>
  );
}

export default Receiver;
