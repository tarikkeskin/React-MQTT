import React, { useContext } from 'react';
import { Card, Form, Input, Row, Col, Button, Select, message } from 'antd';
import axios from 'axios';

const ReadDataFromRedis = ({ publish }) => {

  const [form] = Form.useForm();


  const onFinish = (values) => {

    console.log("On finish Values ReadData!!");
    console.log(values);

    // ******* Axios ***********
    
    axios.post('/read', {
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


  };

  const PublishForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            label="Key(Enter the key of data. It will write data to data.json)"
            name="key"
          >
            <Input />
          </Form.Item>
        </Col>
    
        <Col span={8} offset={16} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search for Key
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Card
      title="Read Data from Redis with given Key"
    >
      {PublishForm}
    </Card>
  );
}

export default ReadDataFromRedis;
