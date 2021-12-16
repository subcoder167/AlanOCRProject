import React from 'react';
import {
  Checkbox,
  Form,
  Button,
  InputNumber,
  Input
} from "antd";

const ExternalAPI = () => {
  return (
    <div>
      <Form className="gx-form-row0">
        <Form.Item label="Dropbox Access Token:">
            <Input
              style={{ width: "200px" }}
              placeholder="Enter Access Token"
            /></Form.Item>
            <Form.Item>
          <Button type="primary"
            style={{ minWidth: "100px" }}>Submit</Button>
          </Form.Item>
        
        </Form>
    </div>
  );
};

export default ExternalAPI;
