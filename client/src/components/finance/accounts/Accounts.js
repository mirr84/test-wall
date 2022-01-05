import React, { useState } from 'react';

import { connector } from "./../../../store/utils/simpleConnector";

import { Form, Input, Button, Checkbox } from 'antd';
import { notification } from 'antd';

import { Table, Tag, Space } from 'antd';

const methods = {
  componentWillMount({ menu, state, dispatch, history, ...props }) {
    console.log('init Accounts', props);
    state.authReducer.isAuth || history.push(`/profile/login`)
  }
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: name => `${name}`,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: true,
    render: age => `${age}`,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: true,
    render: address => `${address}`,
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const pagination = { current: 1, pageSize: 10 }
const loading = false

const handleTableChange = (pagination, filters, sorter) => {
}

const Accounts = ({ state, dispatch, history, ...props }) => {

  return (
    <Table
      columns={columns}
      rowKey={record => record.uuid}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      size="small"
    />
  )

}

export default connector({ methods, component: Accounts });