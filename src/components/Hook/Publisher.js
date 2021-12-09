import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select, message } from 'antd';
import { QosOption } from './HookMqtt'
import axios from 'axios';
import {writeToRedis} from '../../Services'

const Publisher = ({ publish }) => {
  const [form] = Form.useForm();
  const qosOptions = useContext(QosOption);

  const record = {
    topic: 'testtopic/react',
    qos: 0,
  };

  const onFinish = (values) => {

    console.log("inside Publisher OnFinish");
    console.log(values);
    //console.log(typeof(values));
    //console.log(typeof(values.payload));


    // ******* Axios ***********
    
    axios.post('/send', {
      data:values
    })
    .then(res => {
      console.log(res)
    })
    .catch(error => {
          console.log(error)
    })
    
    
    // ******* Fetch from our Service *********

    //writeToRedis(values);

    publish(values);

  };

  const PublishForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Topic"
            name="topic"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="QoS"
            name="qos"
          >
            <Select options={qosOptions} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Payload"
            name="payload"
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Publish and Write
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title="Publish and Write the payload to Redis (There is hard-coded only one key which is 'firstdata' for now!)"
    >
      {PublishForm}
    </Card>
  );
}

export default Publisher;
