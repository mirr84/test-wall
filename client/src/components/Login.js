import React, { useState } from 'react';

import { connector } from "./../store/utils/simpleConnector";

import { Form, Input, Button, Checkbox } from 'antd';
import { notification } from 'antd';

import axios from 'axios';
import md5 from 'md5'

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Login', props);
  }
}

const getAuth = (values) =>
  axios.post(`/api/users/auth`, {username: values.username, password: md5(values.password)} )
    .then(resp => resp.data)
    .catch(err => {
      notification.error({
        message: 'Ошибка в логине или пароле'
      })
    })

const Login = ({ state, dispatch, history, ...props }) => {

  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
    getAuth(values)
      .then(
        (resp) => {
          if (resp) {
            // dispatch.setter('authReducer', {token: resp})
          }
          setLoading(false)
        }
      )
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"      
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: ''  }]}        
        // rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: ''  }]}
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password disabled={loading} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 5 }}>
        <Button type="primary" htmlType="submit" loading={loading} >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )

}

export default connector({ methods, component: Login });