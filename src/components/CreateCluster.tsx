import React from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

const CreateCluster = () => {
  const onFinish = (values: any) => {
    axios
      .post("http://127.0.0.1:8080/clusters", values)
      .then((response: any) => {
        console.log(response.data);
      });
  };
  return (
    <Form name="basic" onFinish={onFinish}>
      <Form.Item
        name="cluster_name"
        label="Cluster Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateCluster;
