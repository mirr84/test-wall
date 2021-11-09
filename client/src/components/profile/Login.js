import React, { useState } from 'react';

import { connector } from "./../../store/utils/simpleConnector";

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
  axios.post(`/api/users/auth`, { username: values.username, password: md5(values.password) })
    .then(resp => resp.data)
    .catch(err => {
      notification.error({
        message: 'Ошибка в логине или пароле'
      })
    })

const onFinish = (values, dispatch, setLoading, history) => {
  setLoading(true)
  dispatch.setter('authReducer', { token: null, isAuth: false })

  getAuth(values)
    .then((resp) => { 
      dispatch.setter('authReducer', { token: resp, isAuth: !!resp }) 
      history.push(`/profile`)
    } )
    .then(() => { setLoading(false) })
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

const Login = ({ state, dispatch, history, ...props }) => {

  const [loading, setLoading] = useState(false)

  return (
    <Form
      name="basic"
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 5 }}
      initialValues={{ remember: true }}
      onFinish={(values) => onFinish(values, dispatch, setLoading, history)}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[{ required: true, message: '' }]}
      // rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input disabled={loading} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: '' }]}
      // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password disabled={loading} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 5 }}>
        <Button type="primary" htmlType="submit" loading={loading} >
          войти
        </Button>
      </Form.Item>
    </Form>
  )

}

export default connector({ methods, component: Login });